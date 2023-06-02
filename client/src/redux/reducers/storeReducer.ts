import { createSlice } from '@reduxjs/toolkit';
import StoreService from '../../api/services/StoreService';
import { ThunkDispatch } from 'redux-thunk';

interface IInitialState {
    isLoading: boolean;
    items: { id: number; title: string; price: number; img: string, count: number }[];
    cartItems: { id: number; title: string; price: number; img: string }[];
    favoriteItems: { id: number; title: string; price: number; img: string }[];
    cartSum: number;
}

export interface IItems {
    id: number;
    title: string;
    price: number;
    img: string;
    count: number;
}[];

const initialState: IInitialState = {
    isLoading: false,
    items: [],
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')!)
        : [],
    favoriteItems: localStorage.getItem('favoriteItems')
        ? JSON.parse(localStorage.getItem('favoriteItems')!)
        : [],
    cartSum: localStorage.getItem('cartSum')
        ? parseInt(localStorage.getItem('cartSum')!)
        : 0
};

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addItems: (state, action) => {
            const newItems = action.payload;
            const uniqueItems = newItems.filter((newItem: {id: number, title: string}) => {
                return !state.items.some((existingItem) => existingItem.id === newItem.id);
            });
            
            state.items.push(...uniqueItems);
        },
        setIsLoading: (state, action: {payload: boolean}) => {
            return {
                ...state,
                isLoading: action.payload
            }
        },

        changeCartSum: (state, action) => {
            let newCartSum = state.cartSum + action.payload;
            localStorage.setItem('cartSum', newCartSum);
            return {
                ...state,
                cartSum: newCartSum
            };
        },

        addItemToCart: (
            state,
            action: {
                payload: {
                    id: number;
                    title: string;
                    price: number;
                    img: string;
                };
            }
        ) => {
            let currentItems = localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems')!)
                : [];
            currentItems.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(currentItems));

            state.cartItems.push(action.payload);
        },

        removeItemFromCart: (state, action) => {
            let currentItems = localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems')!)
                : [];
            currentItems = currentItems.filter(
                (e: any) => e.id !== action.payload
            );
            localStorage.setItem('cartItems', JSON.stringify(currentItems));

            state.cartItems.splice(
                state.cartItems.findIndex(
                    (arrow) => arrow.id === action.payload
                ),
                1
            );
        },

        addItemToFavorite: (
            state,
            action: {
                payload: {
                    id: number;
                    title: string;
                    price: number;
                    img: string;
                };
            }
        ) => {
            let currentItems = localStorage.getItem('favoriteItems')
                ? JSON.parse(localStorage.getItem('favoriteItems')!)
                : [];
            currentItems.push(action.payload);
            localStorage.setItem('favoriteItems', JSON.stringify(currentItems));

            state.favoriteItems.push(action.payload);
        },

        removeItemFromFavorite: (state, action) => {
            let currentItems = localStorage.getItem('favoriteItems')
                ? JSON.parse(localStorage.getItem('favoriteItems')!)
                : [];
            currentItems = currentItems.filter(
                (e: any) => e.id !== action.payload
            );
            localStorage.setItem('favoriteItems', JSON.stringify(currentItems));

            state.favoriteItems.splice(
                state.favoriteItems.findIndex(
                    (arrow) => arrow.id === action.payload
                ),
                1
            );
        }
    }
});

export const { addItemToCart, removeItemFromCart, addItemToFavorite, removeItemFromFavorite, changeCartSum, addItems, setIsLoading } = storeSlice.actions;


export const loadItems = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setIsLoading(true));

    const response = await StoreService.load();
    if (response) {
        dispatch(addItems(response.data));
    }

    setTimeout(() => {
        dispatch(setIsLoading(false));
    }, 500);
};
