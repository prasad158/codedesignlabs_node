import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IAssignmentModel {
    assignment_id: number;
    client_id: number;
    freelancer_id: number;
    assignment_date: string;
    assignment_created_by: number;
    assignment_created_on: string;
    assignment_last_updated_by: number;
    assignment_last_updated_on: string
    project_id: number;
    task_id: number;
    assignment_status: number;
}

class AssignmentModel extends Model<IAssignmentModel> implements IAssignmentModel {
    public assignment_id!: number;
    public client_id!: number;
    public freelancer_id!: number;
    public assignment_date!: string;
    public assignment_created_by!: number;
    public assignment_created_on!: string;
    public assignment_last_updated_by!: number;
    public assignment_last_updated_on!: string;
    public project_id!: number;
    public task_id!: number;
    public assignment_status!: number;
}

AssignmentModel.init({
    assignment_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    client_id: { type: DataTypes.INTEGER, references: { model: 'tbl_client', key: 'id' } },
    freelancer_id: { type: DataTypes.INTEGER },
    assignment_date: { type: DataTypes.STRING },
    assignment_created_by: { type: DataTypes.INTEGER },
    assignment_created_on: { type: DataTypes.DATE },
    assignment_last_updated_by: { type: DataTypes.INTEGER },
    assignment_last_updated_on: { type: DataTypes.DATE },
    project_id: { type: DataTypes.INTEGER },
    task_id: { type: DataTypes.INTEGER },
    assignment_status: { type: DataTypes.STRING },
}, {
    tableName: 'assignments',
    sequelize,
    timestamps: false
});

export default AssignmentModel;
