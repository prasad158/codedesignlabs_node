import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IUserPermisssionModel {
    permission_id: number;
    user_id: number;
    add_new_user: boolean;
    edit_new_user: boolean;
    deactivate_user: boolean;
    add_new_freelancer: boolean;
    edit_new_freelancer: boolean;
    deactivate_freelancer: boolean;
    add_new_client: boolean;
    edit_new_client: boolean;
    add_new_project: boolean;
    edit_new_project: boolean;
    archive_project: boolean;
    add_new_task: boolean;
    edit_new_task: boolean;
    duplicate_task: boolean;
    void_task: boolean;
    mark_complete: boolean;
    mark_paid: boolean;
    created_by: number;
    created_at: Date;
    updated_by: number;
    updated_at: Date;
}

class UserPermisssionModel extends Model<IUserPermisssionModel> implements IUserPermisssionModel {
    public permission_id!: number;
    public user_id!: number;
    public add_new_user!: boolean;
    public edit_new_user!: boolean;
    public deactivate_user!: boolean;
    public add_new_freelancer!: boolean;
    public edit_new_freelancer!: boolean;
    public deactivate_freelancer!: boolean;
    public add_new_client!: boolean;
    public edit_new_client!: boolean;
    public add_new_project!: boolean;
    public edit_new_project!: boolean;
    public archive_project!: boolean;
    public add_new_task!: boolean;
    public edit_new_task!: boolean;
    public duplicate_task!: boolean;
    public void_task!: boolean;
    public mark_complete!: boolean;
    public mark_paid!: boolean;
    public created_by!: number;
    public created_at!: Date;
    public updated_by!: number;
    public updated_at!: Date;

    static getUserStatus(status: string): number {
        if (status == 'active') { return 1; }
        return 0;
    }
}

UserPermisssionModel.init({
    permission_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.NUMBER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    add_new_user: { type: DataTypes.BOOLEAN },
    edit_new_user: { type: DataTypes.BOOLEAN },
    deactivate_user: { type: DataTypes.BOOLEAN },
    add_new_freelancer: { type: DataTypes.BOOLEAN },
    edit_new_freelancer: { type: DataTypes.BOOLEAN },
    deactivate_freelancer: { type: DataTypes.BOOLEAN },
    add_new_client: { type: DataTypes.BOOLEAN },
    edit_new_client: { type: DataTypes.BOOLEAN },
    add_new_project: { type: DataTypes.BOOLEAN },
    edit_new_project: { type: DataTypes.BOOLEAN },
    archive_project: { type: DataTypes.BOOLEAN },
    add_new_task: { type: DataTypes.BOOLEAN },
    edit_new_task: { type: DataTypes.BOOLEAN },
    duplicate_task: { type: DataTypes.BOOLEAN },
    void_task: { type: DataTypes.BOOLEAN },
    mark_complete: { type: DataTypes.BOOLEAN },
    mark_paid: { type: DataTypes.BOOLEAN },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    updated_at: { type: DataTypes.DATE }
}, {
    tableName: 'user_permission',
    sequelize,
    timestamps: false
});

export default UserPermisssionModel;
