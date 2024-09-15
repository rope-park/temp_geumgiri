import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface AuthFormProps {
    isSignup: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup }) => {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: isSignup ? '' : undefined,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('유효한 이메일을 입력하세요').required('이메일은 필수입니다.'),
        password: Yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호는 필수입니다.'),
        confirmPassword: isSignup ? Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.') : undefined,
    });

    const handleSubmit = (values: typeof initialValues) => {
        if (isSignup) {
            // 회원가입 로직
            alert('회원가입이 완료되었습니다.');
        } else {
            // 로그인 로직
            alert('로그인되었습니다.');
        }
    };

    return (
        <Formik initialValues={ initialValues } validationSchema={ validationSchema } onSubmit={ handleSubmit }>
            <Form>
                <div>
                    <label htmlFor="email">이메일</label>
                    <Field type="email" id="email" name="email"/>
                    <ErrorMessage name="email" component="div"/>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <Field type="password" id="password" name="password"/>
                    <ErrorMessage name="password" component="div"/>
                </div>
                {isSignup && (
                    <div>
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <Field type="confirmPassword" id="confirmPassword" name="confirmPassword"/>
                        <ErrorMessage name="confirmPassword" component="div"/>
                    </div>
                )}
                <button type="submit">{isSignup ? '가입하기':'로그인'}</button>
            </Form>
        </Formik>
    );
};

export default AuthForm;
