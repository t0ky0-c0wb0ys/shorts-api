export type Payload = {
  id: string;
};

export interface IJWTService {
  generateToken(payload: Payload, expiresIn: number): Promise<string>;
  verifyToken(token: string): Promise<Payload | null>;
}
