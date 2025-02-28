import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {registerUser} from "../../reducers/userReducer";
import EmailInput from "../../components/registration/EmailInput";
import AuthHeader from "../../components/registration/AuthHeader";
import PasswordInput from "../../components/registration/PasswordInput";
import ActionButton from "../../components/registration/ActionButton";
import AuthFooter from "../../components/registration/AuthFooter";
import NameInput from "../../components/registration/NameInput";
import {useRouter} from "expo-router";

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        let isValid = true;

        if (!username) {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

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
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            dispatch(registerUser({username, email, password}));
            router.replace('/signIn');
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
                        title="Create Account"
                        subtitle="Sign up to get started with NewsCurator"
                    />

                    <View className="space-y-6">
                        <NameInput
                            username={username}
                            setUsername={setUsername}
                            nameError={nameError}
                        />

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
                            onPress={handleSignUp}
                            title="Sign Up"
                        />
                    </View>

                    <AuthFooter
                        message="Already have an account?"
                        linkText="Sign In"
                        linkHref="/signIn"
                    />
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}