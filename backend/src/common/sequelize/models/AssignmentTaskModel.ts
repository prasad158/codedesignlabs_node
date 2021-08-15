import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IAssignmentTaskModel {
    task_id: number;
    assignment_id: number;
    task_name: string;
    quantity: number;
    rate: number;
    total: number;
    completed: boolean;
    completed_on: string;
    mark_completed_by: number;
    mark_completed_on: string;
    paid: boolean;
    paid_on: string;
    mark_paid_by: number;
    mark_paid_on: string;
    payment_remark: string;
    created_by: number;
    created_at: Date;
    updated_by: number;
    updated_at: Date;
}

class AssignmentTaskModel extends Model<IAssignmentTaskModel> implements IAssignmentTaskModel {
    public task_id!: number;
    public assignment_id!: number;
    public task_name!: string;
    public quantity!: number;
    public rate!: number;
    public total!: number;
    public completed!: boolean;
    public completed_on!: string;
    public mark_completed_by!: number;
    public mark_completed_on!: string;
    public paid!: boolean;
    public paid_on!: string;
    public mark_paid_by!: number;
    public mark_paid_on!: string;
    public payment_remark!: string;

    public created_by!: number;
    public created_at!: Date;
    public updated_by!: number;
    public updated_at!: Date;
}

AssignmentTaskModel.init({
    task_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    assignment_id: { type: DataTypes.STRING },
    task_name: { type: DataTypes.STRING },
    quantity: { type: DataTypes.NUMBER },
    rate: { type: DataTypes.NUMBER },
    total: { type: DataTypes.NUMBER },
    completed: { type: DataTypes.STRING },
    completed_on: { type: DataTypes.DATE },
    mark_completed_by: { type: DataTypes.STRING },
    mark_completed_on: { type: DataTypes.DATE },
    paid: { type: DataTypes.STRING },
    paid_on: { type: DataTypes.DATE },
    mark_paid_by: { type: DataTypes.STRING },
    mark_paid_on: { type: DataTypes.DATE },
    payment_remark: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    updated_at: { type: DataTypes.DATE }
}, {
    tableName: 'assignment_tasks',
    sequelize,
    timestamps: false
});

export default AssignmentTaskModel;
