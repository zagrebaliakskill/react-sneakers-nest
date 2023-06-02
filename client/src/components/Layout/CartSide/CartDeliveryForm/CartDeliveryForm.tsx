import { useForm } from 'react-hook-form';
import './/CartDeliveryForm.scss';

const CartDeliveryForm = ({setStep}: {setStep: any}) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: 'onBlur'})

    interface onSubmitData {
        firstAndLastName: string,
        email: string,
        address: string,
    }

    const onSubmit = (data: {}) => {
        setStep(2)
    }

    const handleBackClick = () => {
        setStep(0)
    }


    return (
        <>
            <form className="cart-delivery-form" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    placeholder='Имя и Фамилия' 
                    type="text" 
                    autoComplete='none'
                    className="cart-delivery-form__input"
                    {...register('firstAndLastName', {
                        required: "Поле является обязательным.",
                        minLength: {
                            value: 3,
                            message: "Пожалуйста, введите верные данные."
                        },
                        pattern: /^[a-z ,.'-]+$/i,
                    })}
                />
                <label htmlFor="">
                    {errors?.firstAndLastName && errors?.firstAndLastName?.message?.toString()}
                </label>
                <input 
                    placeholder='Email' 
                    type="text" 
                    autoComplete='none'
                    className="cart-delivery-form__input"
                    {...register('email', {
                        required: "Поле является обязательным.",
                        pattern: {
                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: 'Пожалуйста, введите валидный email.'
                        }
                    })}
                />
                <label htmlFor="">
                    {errors?.email && errors?.email?.message?.toString()}
                </label>
                <input 
                    placeholder='Адресс для доставки' 
                    type="text"
                    autoComplete='none' 
                    className="cart-delivery-form__input"
                    {...register('address', {
                        required: "Поле является обязательным.",
                        minLength: {
                            value: 6,
                            message: "Пожалуйста, введите верный адресс."
                        },
                    })} 
                />
                <label htmlFor="">
                    {errors?.address && errors?.address?.message?.toString()}
                </label>
                <input 
                    value={"Оформить заказ"} 
                    type="submit" 
                    className="cart-delivery-form__submit" 
                />
            </form>
            <input value={"Назад"} onClick={handleBackClick} type="button" className="cart-delivery-form__submit" />
        </>
    )
}

export default CartDeliveryForm