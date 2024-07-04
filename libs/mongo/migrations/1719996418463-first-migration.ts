// Import your models here

import getModels from '@app/mongo/getModel';
import { Book } from '@app/mongo/schema/book.schema';
import bookSplitWord from '@app/mongo/splitword/book';

export async function up(): Promise<void> {
  // Write migration here
  const { bookModel } = await getModels();
  // Write migration here
  const books = await Promise.all(
    (
      [
        {
          name: 'name1',
          describe: `在 Prepare 阶段，事务管理器向资源管理器发送准备指令，资源管理器接收到指令后，执行数据的修改操作并记录相关的日志信息，然后向事务管理器返回可以提交或者不可以提交的结果信息。
在 Commit 阶段，事务管理器接收所有资源管理器返回的结果信息，如果某一个或多个资源管理器向事务管理器返回的结果信息为不可以提交，或者超时，则事务管理器向所有的资源管理器发送回滚指令。如果事务管理器收到的所有资源管理器返回的结果信息为可以提交，则事务管理器向所有的资源管理器发送提交事务的指令。`,
          breed: 'breed',
        },
        {
          name: 'name2',
          describe: `RocketMQ主要由Producer端和Broker端组成。RocketMQ的事务消息主要是为了让Producer端的本地事务与消息发送逻辑形成一个完整的原子操作，即Producer端的本地事务和消息发送逻辑要么全部执行成功，要么全部不执行。在RocketMQ内部，Producer端和Broker端具有双向通信能力，使得Broker端具备事务协调者的功能。RockertMQ提供的消息存储机制本身就能够对消息进行持久化操作，这些可靠的设计能够保证在系统出现异常时，事务依然能够达到一致性。
RocketMQ 4.3 版之后引入了完整的事务消息机制，其内部实现了完整的本地消息表逻辑，使用RocketMQ实现可靠消息分布式事务就不用用户再实现本地消息表的逻辑了，极大地减轻了开发工作量。`,
          breed: 'breed1',
        },
      ] as Book[]
    ).map(async (item) => {
      // item.t = await bookSplitWord(item);
      return item;
    }),
  );
  await bookModel.create<Book>(books);
}

export async function down(): Promise<void> {
  // Write migration here
  // Write migration here
  const { bookModel } = await getModels();
  // Write migration here
  await Promise.all(
    [
      {
        name: 'name1',
        describe: `在 Prepare 阶段，事务管理器向资源管理器发送准备指令，资源管理器接收到指令后，执行数据的修改操作并记录相关的日志信息，然后向事务管理器返回可以提交或者不可以提交的结果信息。
在 Commit 阶段，事务管理器接收所有资源管理器返回的结果信息，如果某一个或多个资源管理器向事务管理器返回的结果信息为不可以提交，或者超时，则事务管理器向所有的资源管理器发送回滚指令。如果事务管理器收到的所有资源管理器返回的结果信息为可以提交，则事务管理器向所有的资源管理器发送提交事务的指令。`,
        breed: 'breed',
      },
      {
        name: 'name2',
        describe: `RocketMQ主要由Producer端和Broker端组成。RocketMQ的事务消息主要是为了让Producer端的本地事务与消息发送逻辑形成一个完整的原子操作，即Producer端的本地事务和消息发送逻辑要么全部执行成功，要么全部不执行。在RocketMQ内部，Producer端和Broker端具有双向通信能力，使得Broker端具备事务协调者的功能。RockertMQ提供的消息存储机制本身就能够对消息进行持久化操作，这些可靠的设计能够保证在系统出现异常时，事务依然能够达到一致性。
RocketMQ 4.3 版之后引入了完整的事务消息机制，其内部实现了完整的本地消息表逻辑，使用RocketMQ实现可靠消息分布式事务就不用用户再实现本地消息表的逻辑了，极大地减轻了开发工作量。`,
        breed: 'breed1',
      },
    ].map(async (item) => {
      await bookModel.deleteOne(item);
    }),
  );
}
