// TSでは型定義はinterfaceを使う
// コンパイル時にinterfaceは削除される
export interface JwtPayload {
  username: string;
}
