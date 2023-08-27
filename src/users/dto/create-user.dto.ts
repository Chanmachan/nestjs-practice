// このファイルは、ユーザーを作成するためのDTO（データ転送オブジェクト）
// DTOは、ユーザーからのリクエストを受け取り、バリデーションを行い、データベースに保存するためのデータを作成するために使う
import { IsString, MinLength, MaxLength } from 'class-validator';
export class createUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username!: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly password!: string;
}
