import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IProjectModel {
    id: number;
    project_name: number;
    project_type_name: number;
    project_broad_category: number;
    client: number;
    status: number;
    purpose: string;
    project_outcome: string
    archive: number;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
}

class ProjectModel extends Model<IProjectModel> implements IProjectModel {
    public id!: number;
    public project_name!: number;
    public project_type_name!: number;
    public project_broad_category!: number;
    public client!: number;
    public status!: number;
    public purpose!: string;
    public project_outcome!: string;
    public archive!: number;
    public created_by!: number;
    public created_at!: string;
    public updated_by!: number;
    public updated_at!: string;
}

ProjectModel.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    project_name: { type: DataTypes.INTEGER },
    project_type_name: { type: DataTypes.INTEGER },
    project_broad_category: { type: DataTypes.INTEGER },
    client: { type: DataTypes.INTEGER, references: { model: 'tbl_client', key: 'id' } },
    status: { type: DataTypes.INTEGER },
    purpose: { type: DataTypes.STRING },
    project_outcome: { type: DataTypes.STRING },
    archive: { type: DataTypes.INTEGER },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    created_at: { type: DataTypes.STRING },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    updated_at: { type: DataTypes.STRING }
}, {
    tableName: 'tbl_project',
    sequelize,
    timestamps: false
});

export default ProjectModel;
