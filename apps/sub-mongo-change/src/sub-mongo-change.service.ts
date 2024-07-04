import { watchInfo } from '@app/mongo/splitword';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class SubMongoChangeService {
  private readonly _pipeline: Array<any> = [];

  constructor(
    @InjectConnection() private connection: Connection,
    private readonly _logger: Logger,
  ) {}

  async run() {
    // 类型 operationType 新增 更新
    // ns->coll
    // pipeline -> t 的更细过滤掉, 只关注必要的更新 -> 更新字段在 watchFields [] (Book -> watchBookFields)
    // 连接 mongo
    const watch = this.connection.watch(this._pipeline);
    // 监听变化
    watch.on('change', async (next) => {
      // ChangeStreamDocument ->
      // ChangeStreamInsertDocument
      // ChangeStreamReplaceDocument
      // ChangeStreamUpdateDocument
      if (
        // TODO: create diff insert
        // next.operationType === 'create' ||
        next.operationType === 'insert' ||
        next.operationType === 'update' ||
        next.operationType === 'replace'
      ) {
        const ns = next.ns;
        if (ns) {
          const { coll } = ns;
          const id = next.documentKey._id;
          // TODO: 类型不严格
          const splitWordInfo = watchInfo[coll];
          if (!splitWordInfo) {
            return;
          }
          const { splitword, watchFields } = splitWordInfo;
          // 处理 -> 全部处理 -> 细粒度 splitword (t xxxx xxxx xxx )
          // 处理完 t -> update
          if (
            next.operationType === 'update' ||
            next.operationType === 'replace'
          ) {
            if (next.operationType === 'update') {
              const updatedFields = next.updateDescription.updatedFields;
              if (!updatedFields) return;
              // 分词导致的更新
              // only t
              // undefined ''
              const updateKeys = Object.keys(updatedFields);
              if (updateKeys.length == 1 && !(updatedFields['t'] === undefined))
                return;
              const runAble = updateKeys.some((i) =>
                (watchFields as string[]).includes(i),
              );
              if (!runAble) return;
              // 查完之后再更
              const model = this.connection.model(splitWordInfo.modelName);
              const newOne = await model.findById(id);
              if (!newOne) return;
              const t = await splitword(newOne);
              newOne.t = t;
              await newOne.save();
              this._logger.debug(
                `一条更新记录被处理成功!+++更新 ${newOne._id}`,
              );
            } else {
              // 查完之后再更
              const model = this.connection.model(splitWordInfo.modelName);
              const newOne = await model.findById(id);
              if (!newOne) return;
              const t = await splitword(newOne); // 可能覆盖 接受到信息, 到处理完成 xxxxx -> .... ... -> ... A -> B -> C -> A -> B -> A -> B
              newOne.t = t;
              await newOne.save();
              this._logger.debug(`一条替换记录被处理成功!+++替换 ${id}`);
            }
          }
          if (next.operationType === 'insert') {
            const model = this.connection.model(splitWordInfo.modelName);
            // const newOne = next.fullDocument; // 下一个 或者 下下
            const newOne = await model.findById(id);
            if (!newOne) return;
            const t = await splitword(newOne); // 可能覆盖 接受到信息, 到处理完成 xxxxx -> .... ... -> ... A -> B -> C -> A -> B -> A -> B
            newOne.t = t;
            await newOne.save();
            this._logger.debug(`一条插入记录被处理成功!+++新增 ${id}`);
          }
        }
      }
      // this._logger.log(next);
    });
  }
}
