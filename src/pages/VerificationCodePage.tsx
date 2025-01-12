import {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Button, InputOtp} from '@nextui-org/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {validateOTP} from '../services/api';

function VerificationCodePage() {
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { phone_number } = location.state || {};

    useEffect(() => {
        if (!phone_number) {
            navigate('/');
        }
    }, [phone_number, navigate]);

    const mutation = useMutation({
        mutationFn: () => validateOTP(verificationCode,phone_number),
        onSuccess: (data) => {
            console.log(data);
            navigate('/personal-info', { state: { phone_number } });
        },
        onError: (error) => {
            //@ts-ignore
            if (error?.response && error.response.data) {setErrorMessage(error.response.data.error_details.fa_details);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('کد وارد شده صحیح نمی باشد.');
            }
        },
    });

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setErrorMessage('');

        mutation.mutate();
    };

    return (
        <Card radius={"sm"} shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">
            <CardHeader className="pb-0 px-4 flex-col items-center text-center">
                <h4 className="uppercase font-bold my-2">کد تایید را وارد کنید.</h4>
                <div className={"flex flex-row gap-2"}>
                    <img src={"/images/note.svg"} alt="Logo"/>
                    <p className="text-xs my-2">{phone_number}</p>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
                <form onSubmit={handleSubmit} className={"items-start flex flex-col"}>
                    <InputOtp dir={"ltr"} length={5} value={verificationCode} onValueChange={setVerificationCode} variant={"bordered"}/>
                    {errorMessage && <p className={"text-danger text-xs my-2"}>{errorMessage}</p>}
                    <Button variant={"light"} className={"text-xs"} endContent={<img src={"/images/retry.svg"}/>}>ارسال
                        مجدد کد</Button>
                    <Button isLoading={mutation.isPending} type={"submit"}
                            className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default VerificationCodePage;