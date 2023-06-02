import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../../api/services/AuthService';

type UserState = {
    email: string;
    cartIsOpen: boolean;
    auth: {
        isLoading: boolean;
        isLoggedIn: boolean;
    };
};

const initialState: UserState = {
    email: '',
    cartIsOpen: false,
    auth: {
        isLoading: false,
        isLoggedIn: false
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleCartVisible: (state) => {
            return {
                ...state,
                cartIsOpen: state.cartIsOpen ? false : true
            };
        },

        loginLoading: (state) => {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isLoading: true
                }
            };
        },

        loginSuccess: (state, action) => {
            return {
                ...state,
                email: action.payload.user.email,
                auth: {
                    ...state.auth,
                    isLoading: false,
                    isLoggedIn: true
                }
            };
        },

        loginFailure: (state) => {
            return {
                ...state,
                auth: {
                    isLoading: false,
                    isLoggedIn: false
                }
            };
        }
    }
});

export const { toggleCartVisible, loginLoading, loginSuccess, loginFailure } =
    userSlice.actions;

export const login =
    (email: string, password: string) =>
    async (dispatch: any): Promise<void> => {
        dispatch(loginLoading());
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            dispatch(loginSuccess(response.data));
        } catch (error: any) {
            dispatch(loginFailure());
        }
    };

export const checkAuth =
    () =>
    async (dispatch: any): Promise<void> => {
        dispatch(loginLoading());
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('accessToken', response.data.accessToken);
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(loginFailure());
        }
    };
