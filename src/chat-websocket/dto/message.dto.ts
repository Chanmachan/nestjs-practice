export class MessageDto {
  readonly content: string;
  // prismaが自動で作成するため、オプションにする
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
