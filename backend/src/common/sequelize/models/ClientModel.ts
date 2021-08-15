import sequelize from "@config/db";
import { DataTypes, Model } from "sequelize";

export interface IClientModel {
    id: number;
    industry_id: number;
    business_name: string;
    client_name: string;
    address: string;
    website: string;
    business_contact: string;
    email_business: string;
    phone_no: string;
    project_contact: string;
    email_project: string;
    phone_no_project: string;
    client_info: string;
    facebook_link: string;
    instagram_link: string;
    linkedin_link: string;
    created_by: number;
    created_at: Date;
    updated_by: number;
    updated_at: Date;
}

class ClientModel extends Model<IClientModel> implements IClientModel {
    public id!: number;
    public industry_id!: number;
    public business_name!: string;
    public client_name!: string;
    public address!: string;
    public website!: string;
    public business_contact!: string;
    public email_business!: string;
    public phone_no!: string;
    public project_contact!: string;
    public email_project!: string;
    public phone_no_project!: string;
    public client_info!: string;
    public facebook_link!: string;
    public instagram_link!: string;
    public linkedin_link!: string;
    public created_by!: number;
    public created_at!: Date;
    public updated_by!: number;
    public updated_at!: Date;
}

ClientModel.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    industry_id: { type: DataTypes.INTEGER },
    business_name: { type: DataTypes.STRING },
    client_name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    business_contact: { type: DataTypes.STRING },
    email_business: { type: DataTypes.STRING },
    phone_no: { type: DataTypes.STRING },
    project_contact: { type: DataTypes.STRING },
    email_project: { type: DataTypes.STRING },
    phone_no_project: { type: DataTypes.STRING },
    client_info: { type: DataTypes.STRING },
    facebook_link: { type: DataTypes.STRING },
    instagram_link: { type: DataTypes.STRING },
    linkedin_link: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, references: { model: 'user_info', key: 'user_id' } },
    updated_at: { type: DataTypes.DATE }
}, {
    tableName: 'tbl_client',
    sequelize,
    timestamps: false
});

export default ClientModel;
