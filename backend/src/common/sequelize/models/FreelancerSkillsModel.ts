import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IFreelancerSkills {
    id: number;
    skill_name: string;
}

class FreelancerSkills extends Model<IFreelancerSkills> implements IFreelancerSkills {
    public id!: number;
    public skill_name!: string;
}

FreelancerSkills.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    skill_name: { type: DataTypes.STRING }
}, {
    tableName: 'freelancer_skills',
    sequelize,
    timestamps: false
});

export default FreelancerSkills;
