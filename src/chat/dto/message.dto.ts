export class MessageDto {
  readonly content: string;
  readonly userId: number;
  // prismaが自動で作成するため、オプションにする
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
