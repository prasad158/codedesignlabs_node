import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IFreelancerProfileType {
    freelancer_profile_type_id: number;
    freelancer_profile_type_name: string;
}

class FreelancerProfileType extends Model<IFreelancerProfileType> implements IFreelancerProfileType {
    public freelancer_profile_type_id!: number;
    public freelancer_profile_type_name!: string
}

FreelancerProfileType.init({
    freelancer_profile_type_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    freelancer_profile_type_name: { type: DataTypes.STRING }
}, {
    tableName: 'freelancer_profile_types',
    sequelize,
    timestamps: false
});

export default FreelancerProfileType;
