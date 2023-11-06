import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UpgradeRole, CustomFieldData } from "../../types/types";
import './styles.css';

type GroupVisibility = {
    personalInfo: boolean;
    orgDetails: boolean;
    contactDetails: boolean;
    institutionInfo: boolean;
    alternateDetails: boolean;
    representativeDetails: boolean;
    receiptDetails: boolean;
};

const JoinUs: React.FC = () => {
    const location = useLocation();
    const userData = location.state?.user;

    const initialFormData: UpgradeRole = {
        orgName: "",
        user_name: "",
        user_surname: "",
        user_email: userData?.email || "",
        user_phone: "",
        user_lineId: "",
        contact_name: "",
        contact_surname: "",
        contact_email: "",
        contact_phone: "",
        contact_lineId: "",
        institution_name: "",
        institution_addresss: "",
        institution_city: "",
        institution_province: "",
        institution_postcode: "",
        institution_country: "",
        representative_name: "",
        representative_surname: "",
        representative_email: "",
        representative_phone: "",
        representative_lineId: "",
        alternate_name: "",
        alternate_surname: "",
        alternate_email: "",
        alternate_phone: "",
        alternate_lineId: "",
        receipt_name: "",
        receipt_taxNumber: "",
        receipt_address: "",
        receipt_province: "",
        receipt_postcode: "",
        receipt_country: "",
        receipt_city: "",
        roleId: "",
        roleTypeId: "",
        address: "",
        city: "",
        province: "",
        postcode: "",
        country: ""
    };

    function pickFields(source: any, fields: string[]): Partial<UpgradeRole> {
        return fields.reduce((result, key) => {
            if (source[key] !== undefined) {
                result[key as keyof UpgradeRole] = source[key];
            }
            return result;
        }, {} as Partial<UpgradeRole>);
    }

    const [formData, setFormData] = useState<UpgradeRole>(initialFormData);
    const [errors, setErrors] = useState<Partial<UpgradeRole>>({});
    const [groupVisible, setGroupVisible] = useState<Partial<GroupVisibility>>({
        personalInfo: true,
        orgDetails: true,
        contactDetails: false,
        alternateDetails: false,
        representativeDetails: false,
        receiptDetails: false,
    });

    const toggleGroup = (groupName: keyof GroupVisibility) => {
        setGroupVisible((prevVisible) => ({
            ...prevVisible,
            [groupName]: !prevVisible[groupName],
        }));
    }

    const fieldMapping: Record<string, CustomFieldData> = {
        orgName: { name: "Organization Name", placeholder: "Your organization name" },
        user_name: { name: "Name", placeholder: "Your user name" },
        user_surname: { name: "Surname", placeholder: "Your user surname" },
        user_email: { name: "Email", placeholder: "Your user email" },
        user_phone: { name: "Phone", placeholder: "Your user phone number" },
        user_lineId: { name: "Line ID", placeholder: "Your user Line ID" },
        user_address: { name: "Address", placeholder: "User address" },
        user_city: { name: "City", placeholder: "User city" },
        user_province: { name: "Province", placeholder: "User province" },
        user_postcode: { name: "Postcode", placeholder: "User postcode" },
        user_country: { name: "Country", placeholder: "User province" },
        contact_name: { name: "Contact Name", placeholder: "Contact name" },
        contact_surname: { name: "Contact Surname", placeholder: "Contact surname" },
        contact_email: { name: "Contact Email", placeholder: "Contact email" },
        contact_phone: { name: "Contact Phone", placeholder: "Contact phone number" },
        contact_lineId: { name: "Contact Line ID", placeholder: "Contact Line ID" },
        representative_name: { name: "Representative Name", placeholder: "Representative name" },
        representative_surname: { name: "Representative Surname", placeholder: "Representative surname" },
        representative_email: { name: "Representative Email", placeholder: "Representative email" },
        representative_phone: { name: "Representative Phone", placeholder: "Representative phone number" },
        representative_lineId: { name: "Representative Line ID", placeholder: "Representative Line ID" },
        alternate_name: { name: "Alternate Name", placeholder: "Alternate name" },
        alternate_surname: { name: "Alternate Surname", placeholder: "Alternate surname" },
        alternate_email: { name: "Alternate Email", placeholder: "Alternate email" },
        alternate_phone: { name: "Alternate Phone", placeholder: "Alternate phone number" },
        alternate_lineId: { name: "Alternate Line ID", placeholder: "Alternate Line ID" },
        receipt_name: { name: "Receipt Name", placeholder: "Receipt name" },
        receipt_taxNumber: { name: "Tax Number", placeholder: "Tax number" },
        receipt_address: { name: "Receipt Address", placeholder: "Receipt address" },
        receipt_province: { name: "Receipt Province", placeholder: "Receipt province" },
        receipt_postcode: { name: "Receipt Postcode", placeholder: "Receipt postcode" },
        receipt_city: { name: "Receipt City", placeholder: "Receipt city" },
        receipt_country: { name: "Receipt Country", placeholder: "Receipt country" },
        roleId: { name: "Role ID", placeholder: "Role ID" },
        roleTypeId: { name: "Role Type ID", placeholder: "Role Type ID" },
    };

    const renderInputField = (key: string) => {
        let inputType = "text";
        if (key === "email") inputType = "email";
        if (key === "password") inputType = "password";

        const customField = fieldMapping[key] || [];
        const customName = customField.name || key;
        const customPlaceholder = customField.placeholder;

        const fieldError = errors[key as keyof UpgradeRole];
        const inputClassName = fieldError ? 'invalid' : '';

        return (
            <div key={key} className={`form-group ${fieldError ? 'error' : ''}`}>
                <label htmlFor={key}>{customName}</label>
                <input
                    type={inputType}
                    name={key}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    placeholder={customPlaceholder}
                    className={inputClassName}
                />
            </div>
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const inputGroups = [
        {
            fields: ["user_name", "user_surname", "user_email", "user_phone", "user_address", "user_city", "user_province", "user_country", "user_postcode"],
            name: "Personal Information",
            className: "personal-info",
        },
        {
            fields: ["orgName"],
            name: "Organization Details",
            className: "org-details",
        },
        {
            fields: ["contact_name", "contact_surname", "contact_email", "contact_phone"],
            name: "Contact Details",
            className: "contact-details",
        },
        {
            fields: ["alternate_name", "alternate_surname", "alternate_email", "alternate_phone"],
            name: "Alternate Details",
            className: "alternate-details",
        },
        {
            fields: ["representative_name", "representative_surname", "representative_email", "representative_phone"],
            name: "Representative Details",
            className: "representative-details",
        },
        {
            fields: ["receipt_name", "receipt_taxNumber", "receipt_address", "receipt_city", "receipt_province", "receipt_country", "receipt_postcode"],
            name: "Receipt Details",
            className: "receipt-details",
        }
    ]

    const renderInputGroup = (group: any, groupIndex: number) => (
        <div key={groupIndex} className={`input-group-${group.className}`} onClick={() => toggleGroup(group.name as keyof GroupVisibility)}>
            <h2>
                {group.name}
                <span className={groupVisible[group.name as keyof GroupVisibility] ? "arrow-up" : "arrow-down"}></span>
            </h2>
            {groupVisible[group.name as keyof GroupVisibility] && group.fields.map((key: string) => renderInputField(key))}
        </div>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                {inputGroups.map((group, index) => renderInputGroup(group, index))}
            </form>

            <div className="form-action-btns">
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
            </div>

            <div className="dark-bg"></div>
        </div>
    );
};

export default JoinUs;