import { useDispatch, useSelector } from 'react-redux';
import './CartSide.scss';
import { removeItemFromCart, changeCartSum } from '../../../redux/reducers/storeReducer';
import { toggleCartVisible, } from '../../../redux/reducers/userReducer';
import CartEmpty from './CartEmpty/CartEmpty';
import { useState } from 'react';
import CartDeliveryForm from './CartDeliveryForm/CartDeliveryForm';
import CartDeliveryFormSubmited from './CartDeliveryFormSubmited/CartDeliveryFormSubmited';

const CartSide: React.FC = () => {
    const dispatch = useDispatch()

    const handleOutsideClick = () => {
        dispatch(toggleCartVisible())
    }

    const handleRemoveItemClick = (id: number, price: number) => {
        dispatch(removeItemFromCart(id))
        dispatch(changeCartSum(-price))
    }

    const handleNextStepClick = () => {
        if (orderStep == 2) {
            setOrderStep(0)
        }
        setOrderStep(orderStep + 1)
    }

    const {cartSum, cartItems} = useSelector((store: any) => store.store)
    const [orderStep, setOrderStep] = useState(0)
    return (
        <>
            <div className="cart-side" onClick={handleOutsideClick}>
                    <div 
                    className={
                        `cart-side__inner${(cartItems.length == 0 || orderStep == 2) ? " card-side__inner--center" : ''}`
                    } 
                    onClick={(e) => e.stopPropagation()}>
                        <p className="cart-side__title">
                            Корзина
                        </p>
                        {(cartItems.length > 0 && !orderStep)  ?
                        <>
                            <div className="cart-side__items">
                                {cartItems.map((item: {id: number, img: string, title: string, price: number}) => {
                                return (
                                    <div className="cart-side__item" key={item.id}>
                                        <img src={item.img} width={70} height={70} className="cart-side__item-img"/>
                                        <div className="cart-side__item-info">
                                            <p className="cart-side__item-name">
                                                {item.title}
                                            </p>
                                            <p className="cart-side__item-price">
                                                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.
                                            </p>
                                        </div>
                                        <img onClick={() => handleRemoveItemClick(item.id, item.price)} height={32} width={32} src='/img/cart-side-remove-item.svg' className="cart-side__item-button"/>
                                    </div>
                                )
                                })}
                            </div>
                            <div className="cart-side__info">
                                <p className="cart-side__info-item">
                                    <span className="cart-side__info-title">Итого:</span> 
                                    <span className='cart-side__info-dashed'></span>
                                    <span className='cart-side__info-value'>{Math.floor(cartSum * 1.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
                                </p>
                                <p className="cart-side__info-item">
                                    <span className="cart-side__info-title">Налог 5%:</span>
                                    <span className='cart-side__info-dashed'></span> 
                                    <span className='cart-side__info-value'>{Math.floor((cartSum * 0.05)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
                                </p>
                                <button type='button' className='cart-side__info-submit' onClick={handleNextStepClick}>
                                    Оформить заказ 
                                    <img src="/img/cart-side-arrow-button.svg" alt="arrow" />
                                </button>
                            </div>
                        
                        </> : null}
                        {
                            (cartItems.length == 0 && !orderStep) ? <CartEmpty/> : null
                        }
                        {
                            orderStep == 1 ? <CartDeliveryForm setStep={setOrderStep}/> : null
                        }
                        {
                            orderStep == 2 ? <CartDeliveryFormSubmited setStep={setOrderStep}/> : null
                        }
                    </div>
            </div>
        </>
    )
}

export default CartSide
