import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {loginUser} from "../../reducers/userReducer";
import EmailInput from "../../components/registration/EmailInput";
import PasswordInput from "../../components/registration/PasswordInput";
import ActionButton from "../../components/registration/ActionButton";
import AuthFooter from "../../components/registration/AuthFooter";
import AuthHeader from "../../components/registration/AuthHeader";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignIn = () => {
        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            dispatch(loginUser({email, password}));
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <ScrollView className="flex-1 bg-background">
                <LinearGradient
                    colors={['rgba(139, 92, 246, 0.15)', 'rgba(17, 24, 39, 0)']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 0.6}}
                    className="flex-1 min-h-screen px-6 py-12 justify-center"
                >
                    <AuthHeader
                        title="Welcome back"
                        subtitle="Sign in to continue to NewsCurator"
                    />

                    <View className="space-y-6">
                        <EmailInput
                            email={email}
                            setEmail={setEmail}
                            emailError={emailError}
                        />
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            passwordError={passwordError}
                        />

                        <ActionButton
                            onPress={handleSignIn}
                            title="Sign In"
                        />
                    </View>

                    <AuthFooter
                        message="Don't have an account?"
                        linkText="Sign Up"
                        linkHref="/signUp"
                    />
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}