import { User } from '@/core/types/user';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema<User>({
  // id: { type: String },
  // name: { type: String },
  // username: { type: String },
  // email: { type: String },
  // emailVerified: { type: Boolean },
  // password: { type: String },
  // image: { type: String },
  // role: { type: String, enum: UserRole, default: UserRole.user },
  // provider: { type: String, enum: SocialProvider },
});

const UserModel = models.User || model('User', userSchema);

export default UserModel;
