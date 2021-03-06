import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";
import FreelancerProfileType from "./FreelancerProfileTypeModel";
import UserInfoModel from "./UserInfoModel";

export interface IFreelancerModel {
    freelancer_id: number;
    freelancer_name: string;
    freelancer_email_id: string;
    profile_type: number;
    portfolio_link: string;
    date_of_joining: string;
    freelancer_address: string;
    freelancer_mobile_number: string
    work_preference: string;
    usp_as_discovered: string,
    dob: string;
    account_number: string;
    bank_name: string;
    ifsc_code: string;
    Ac_Type: string;
    pan_card: string;
    active: boolean;
    created_by: number;
    created_at: Date;
    updated_by: number;
    updated_at: Date;
}

class FreelancerModel extends Model<IFreelancerModel> implements IFreelancerModel {
    public freelancer_id!: number;
    public freelancer_name!: string;
    public freelancer_email_id!: string;
    public profile_type!: number;
    public portfolio_link!: string;
    public date_of_joining!: string;
    public freelancer_address!: string;
    public freelancer_mobile_number!: string;
    public work_preference!: string;
    public usp_as_discovered!: string;
    public dob!: string;
    public account_number!: string;
    public bank_name!: string;
    public ifsc_code!: string;
    public Ac_Type!: string;
    public pan_card!: string;
    public active!: boolean;
    public created_by!: number;
    public created_at!: Date;
    public updated_by!: number;
    public updated_at!: Date;
}

FreelancerModel.init({
    freelancer_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    freelancer_name: { type: DataTypes.STRING },
    freelancer_email_id: { type: DataTypes.STRING },
    profile_type: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'freelancer_profile_types', key: 'freelancer_profile_type_id' } },
    portfolio_link: { type: DataTypes.STRING },
    date_of_joining: { type: DataTypes.STRING },
    freelancer_address: { type: DataTypes.STRING },
    freelancer_mobile_number: { type: DataTypes.STRING },
    work_preference: { type: DataTypes.STRING },
    usp_as_discovered: { type: DataTypes.STRING },
    dob: { type: DataTypes.STRING },
    account_number: { type: DataTypes.STRING },
    bank_name: { type: DataTypes.STRING },
    ifsc_code: { type: DataTypes.STRING },
    Ac_Type: { type: DataTypes.STRING },
    pan_card: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    updated_at: { type: DataTypes.DATE }
}, {
    tableName: 'freelancers',
    sequelize,
    timestamps: false
});

FreelancerModel.hasOne(FreelancerProfileType, {
    sourceKey: 'profile_type',
    foreignKey: 'freelancer_profile_type_id'
});

FreelancerModel.hasOne(UserInfoModel, {
    sourceKey: 'created_by',
    foreignKey: 'user_id'
});

FreelancerModel.hasOne(UserInfoModel, {
    sourceKey: 'updated_by',
    foreignKey: 'user_id'
});

export default FreelancerModel;
