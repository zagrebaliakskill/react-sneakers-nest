import { FormEvent, useState } from 'react';
import './Auth.scss';
import { login } from '../../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/store';

const Login = () => {
    const { auth } = useSelector((store: any) => store.user);
    const [authType, setAuthType] = useState('login');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <>
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
                    <p>{authType == 'register' ? 'Регистрация' : 'Вход'}</p>
                    <span>Email</span>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="none"
                    />
                    <span>Пароль</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="none"
                    />
                    {authType == 'register' ? (
                        <>
                            <span>Повторите пароль</span>
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                                autoComplete="none"
                            />
                        </>
                    ) : null}
                    <input
                        type="submit"
                        value={
                            authType == 'register'
                                ? 'Зарегестрироваться'
                                : 'Войти'
                        }
                    />
                    <div className="auth-form-bottom">
                        <a
                            onClick={() => {
                                authType == 'login'
                                    ? setAuthType('register')
                                    : setAuthType('login');
                            }}
                        >
                            {authType == 'register'
                                ? 'Войти'
                                : 'Регистрация'}
                        </a>
                        <a href="#">Восстановить аккаунт</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
