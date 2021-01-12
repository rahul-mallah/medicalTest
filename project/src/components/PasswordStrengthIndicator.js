import React from "react";

const PasswordStrengthIndicator = ({validity: {minChar, lower, upper, number, specialChar}}) => 
{
    return (
        <div className="password-meter test-left mb-4">
            <p className="text-dark">
                Password must contain:
            </p>
            <ul className="text-muted">
                <PasswordStrengthIndicatorItem isValid={minChar} text="Have at least 8 characters"/>
                <PasswordStrengthIndicatorItem isValid={upper} text="Have at least 1 upper case letter"/>
                <PasswordStrengthIndicatorItem isValid={lower} text="Have at least 1 lower case letter"/>
                <PasswordStrengthIndicatorItem isValid={number} text="Have at least 1 number"/>
                <PasswordStrengthIndicatorItem isValid={specialChar} text="Have at least 1 special character"/>
            </ul>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({isValid, text}) => 
{
    const highlistClass = isValid 
    ? "text-success" 
    : isValid !== null 
    ? "text-danger" 
    : ""

    return <li className={highlistClass}>{text}</li>
}

export default PasswordStrengthIndicator;