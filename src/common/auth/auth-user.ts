export class AuthUser {
  _id: string;
  email: string;
  companyId?: string;


  constructor(id: string, email: string, companyId: string) {
    this._id = id;
    this.email = email;
    this.companyId = companyId;
  }
}
