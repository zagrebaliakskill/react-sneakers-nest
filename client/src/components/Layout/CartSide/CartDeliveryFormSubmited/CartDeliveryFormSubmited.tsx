import './CartDeliveryFormSubmited.scss';

type Props = {
    setStep: React.Dispatch<React.SetStateAction<number>>;
};

const CartDeliveryFormSubmited = ({setStep}: Props) => {
    const handleButtonClick = () => {
        setStep(1)
    }

    return (
        <div className="cart-side__submited">
            <img src="/img/cart-submit.png" height={83} width={120} alt="cart submited" />
            <p className='cart-side__submited-title'>Заказ оформлен!</p>
            <p className='cart-side__submited-description'>Ваш заказ #18 скоро будет передан курьерской доставке.</p>
            <button className="cart-side__submited-button" onClick={handleButtonClick}>
                <img src="/img/cart-side-arrow-left-button.svg" alt="" />
                Вернуться назад
            </button>
        </div>
    )
}

export default CartDeliveryFormSubmited