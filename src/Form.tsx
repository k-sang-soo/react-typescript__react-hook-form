import { useState } from 'react';
import { useForm } from 'react-hook-form';

// function Form() {
//     const [toDo, setToDo] = useState('');
//     const [toDoError, setToDoError] = useState('');
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value },
//         } = event;
//         setToDoError('');
//         setToDo(value);
//     };
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (toDo.length < 10) {
//             return setToDoError('To do should be longer');
//         }
//         console.log('submit');
//     };
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//                 <button>Add</button>
//                 {toDoError !== '' ? toDoError : null}
//             </form>
//         </div>
//     );
// }

interface IFormData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    extraError?: string;
}

// interface IFormData {
//     [key: string]: string;
// }

function Form() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IFormData>({
        defaultValues: {
            email: '@naver.com',
        },
    });
    // register 안에는 onChange, onBlur 과 같은 이벤트 및 name 설정할 수 있는 것들이 들어있음
    // watch 값이 변경 될 때 감지하는 기능
    // handleSubmit은 데이터 값이 유효한지 체크하는 기능, 호출 후 2개의 인자를 받음, 하나는 데이터가 유효할 때 다른 하나는 유효하지 않을 때
    // formState 은 error 타입과 네임을 알려줌
    // setError 은 새로운 에러를 던지고 싶을 때
    // setError를 통해 error를 발생하는 것과 validate를 사용해서 검사를하는 것의 차이를 잘 모르겠다.

    const onValid = (data: IFormData) => {
        console.log('data asdasdasdasd ', data);
        if (data.password !== data.passwordConfirm) {
            return setError('passwordConfirm', { message: '패스워드가 다릅니다.' }, { shouldFocus: true });
            //return을 안해주면 1번만 오류를 잡아주는 버그가 생김
        }
        setError('extraError', { message: 'Server offline.' });
    };
    // console.log(register('name'));
    // console.log('watch', watch());
    console.log('formState', errors);

    return (
        <div>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
                <input
                    style={{ marginBottom: '20px' }}
                    {...register('email', { required: '이메일을 적어주세요', pattern: { value: /^[A-Za-z0-9._%+-]+@naver\.com$/, message: 'naver.com 주소만 허용 됩니다.' } })}
                    placeholder="email"
                />
                <span>{errors?.email?.message}</span>
                <input
                    style={{ marginBottom: '20px' }}
                    {...register('firstName', {
                        required: '값을 입력해주세요',
                        validate: {
                            noNico: (value) => !value.includes('nico') || 'nico가 들어간 이름은 입력할 수 없습니다.',
                            noNick: (value) => !value.includes('nick') || 'nick가 들어간 이름은 입력할 수 없습니다.',
                        },
                    })}
                    placeholder="firstName"
                />
                {/* react-hook-form 에서 문자열은 에러메세지를 띄우는 용도로 사용 ex)위에 validate 참고  */}
                <span>{errors?.firstName?.message}</span>
                <input style={{ marginBottom: '20px' }} {...register('lastName', { required: '값을 입력해주세요' })} placeholder="lastName" />
                <span>{errors?.lastName?.message}</span>
                <input style={{ marginBottom: '20px' }} {...register('password', { required: '값을 입력해주세요', minLength: { value: 5, message: '패스워드가 짧습니다.' } })} placeholder="password" />
                <span>{errors?.password?.message}</span>
                <input
                    style={{ marginBottom: '20px' }}
                    {...register('passwordConfirm', { required: '패스워드를 입력해주세요', minLength: { value: 5, message: '패스워드가 짧습니다.' } })}
                    placeholder="passwordConfirm"
                />
                <span>{errors?.passwordConfirm?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

export default Form;
