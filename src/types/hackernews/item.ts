export interface Item {
  readonly id: number;

  readonly type: string;

  readonly title: string;

  readonly time: number;

  readonly deleted: boolean;

  readonly dead: boolean;

  readonly by: string;

  readonly text: string;

  readonly parent?: number;

  readonly poll: number;

  readonly children: Array<Item>;

  readonly options: Array<Item>;

  readonly url: string;

  readonly score: number;

  readonly descendants: number;
}
