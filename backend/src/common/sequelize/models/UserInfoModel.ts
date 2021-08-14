import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IUserInfoModel {
    user_id: number;
    user_email_id: string;
    password: string;
    user_type_id: number;
    user_name: string;
    active: boolean;
    mobile: string;
    designation: string;
    dp: string;
    department: string;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
}

class UserInfoModel extends Model<IUserInfoModel> implements IUserInfoModel {
    public user_id!: number;
    public user_email_id!: string;
    public password!: string;
    public user_type_id!: number;
    public user_name!: string;
    public active!: boolean;
    public mobile!: string;
    public designation!: string;
    public dp!: string;
    public department!: string;
    public created_by!: number;
    public created_at!: string;
    public updated_by!: number;
    public updated_at!: string;
}

UserInfoModel.init({
    user_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_email_id: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    user_type_id: { type: DataTypes.INTEGER },
    user_name: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN },
    mobile: { type: DataTypes.STRING },
    designation: { type: DataTypes.STRING },
    dp: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER.UNSIGNED },
    created_at: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED },
    updated_at: { type: DataTypes.STRING }
}, {
    tableName: 'user_info',
    sequelize,
    timestamps: false
});

export default UserInfoModel;
