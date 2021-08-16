import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IFreelancerProfileTypeModel {
    freelancer_profile_type_id: number;
    freelancer_profile_type_name: string;
}

class FreelancerProfileTypeModel extends Model<IFreelancerProfileTypeModel> implements IFreelancerProfileTypeModel {
    public freelancer_profile_type_id!: number;
    public freelancer_profile_type_name!: string
}

FreelancerProfileTypeModel.init({
    freelancer_profile_type_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    freelancer_profile_type_name: { type: DataTypes.STRING }
}, {
    tableName: 'freelancer_profile_types',
    sequelize,
    timestamps: false
});

export default FreelancerProfileTypeModel;
