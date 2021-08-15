import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";
import ClientModel from "./ClientModel";
import FreelancerModel from "./FreelancerModel";
import ProjectModel from "./ProjectModel";

export interface ITaskModel {
    task_id: number;
    to_be_done: number;
    expexted_outcome: string;
    to_be_done_check: string;
    expected_outcome_check: string;
    length_of_content: string;
    length_of_content_check: string;
    content: string;
    content_check: string;
    size: string;
    size_check: string;
    colors: string;
    colors_check: string;
    reference: string;
    reference_check: string;
    remark: string;
    remark_check: string;
    standard_instruction: string;
    standard_ins_check: string;
    deadline: string;
    deadline_check: string;
    base_fee: string;
    base_fee_check: string;
    resizing_fee: string;
    resizing_check: string;
    other_fee: string;
    other_fee_check: string;
    is_save: boolean;
    client_id: number;
    project_id: number;
    other_amount: string;
    base_amount: string;
    resizing_amount: string;
    brief_title: string;
    latest_pdf: string;
    category: string;
    freelancer_id: number;
    profile_type: string;
    task_status: number;
    task_archive: string;
    created_by: number;
    created_at: Date;
    updated_by: number;
    updated_at: Date;
}

class TaskModel extends Model<ITaskModel> implements ITaskModel {
    public task_id!: number;
    public to_be_done!: number;
    public expexted_outcome!: string;
    public to_be_done_check!: string;
    public expected_outcome_check!: string;
    public length_of_content!: string;
    public length_of_content_check!: string;
    public content!: string;
    public content_check!: string;
    public size!: string;
    public size_check!: string;
    public colors!: string;
    public colors_check!: string;
    public reference!: string;
    public reference_check!: string;
    public remark!: string;
    public remark_check!: string;
    public standard_instruction!: string;
    public standard_ins_check!: string;
    public deadline!: string;
    public deadline_check!: string;
    public base_fee!: string;
    public base_fee_check!: string;
    public resizing_fee!: string;
    public resizing_check!: string;
    public other_fee!: string;
    public other_fee_check!: string;
    public is_save!: boolean;
    public client_id!: number;
    public project_id!: number;
    public other_amount!: string;
    public base_amount!: string;
    public resizing_amount!: string;
    public brief_title!: string;
    public latest_pdf!: string;
    public category!: string;
    public freelancer_id!: number;
    public profile_type!: string;
    public task_status!: number;
    public task_archive!: string;
    public created_by!: number;
    public created_at!: Date;
    public updated_by!: number;
    public updated_at!: Date;
}

TaskModel.init({
    task_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    to_be_done: { type: DataTypes.STRING },
    expexted_outcome: { type: DataTypes.STRING },
    to_be_done_check: { type: DataTypes.STRING },
    expected_outcome_check: { type: DataTypes.STRING },
    length_of_content: { type: DataTypes.STRING },
    length_of_content_check: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    content_check: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    size_check: { type: DataTypes.STRING },
    colors: { type: DataTypes.STRING },
    colors_check: { type: DataTypes.STRING },
    reference: { type: DataTypes.STRING },
    reference_check: { type: DataTypes.STRING },
    remark: { type: DataTypes.STRING },
    remark_check: { type: DataTypes.STRING },
    standard_instruction: { type: DataTypes.STRING },
    standard_ins_check: { type: DataTypes.STRING },
    deadline: { type: DataTypes.DATE },
    deadline_check: { type: DataTypes.STRING },
    base_fee: { type: DataTypes.STRING },
    base_fee_check: { type: DataTypes.STRING },
    resizing_fee: { type: DataTypes.STRING },
    resizing_check: { type: DataTypes.STRING },
    other_fee: { type: DataTypes.STRING },
    other_fee_check: { type: DataTypes.STRING },
    is_save: { type: DataTypes.BOOLEAN },
    client_id: { type: DataTypes.NUMBER.UNSIGNED },
    project_id: { type: DataTypes.NUMBER.UNSIGNED },
    other_amount: { type: DataTypes.STRING },
    base_amount: { type: DataTypes.STRING },
    resizing_amount: { type: DataTypes.STRING },
    brief_title: { type: DataTypes.STRING },
    latest_pdf: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    freelancer_id: { type: DataTypes.NUMBER.UNSIGNED },
    profile_type: { type: DataTypes.STRING },
    task_status: { type: DataTypes.INTEGER },
    task_archive: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    updated_at: { type: DataTypes.DATE }
}, {
    tableName: 'task_brief_tbl',
    sequelize,
    timestamps: false
});

TaskModel.hasOne(ClientModel, {
    sourceKey: 'client_id',
    foreignKey: 'id'
});

TaskModel.hasOne(ProjectModel, {
    sourceKey: 'project_id',
    foreignKey: 'id'
});

TaskModel.hasOne(FreelancerModel, {
    sourceKey: 'freelancer_id',
    foreignKey: 'freelancer_id'
});

export default TaskModel;
