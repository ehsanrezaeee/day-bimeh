import { useState } from 'react';
import {Card, CardBody, CardHeader, Button, InputOtp} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function VerificationCodePage() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate('/personal-info');
    };

    return (
        <Card radius={"sm"} shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">
            <CardHeader className="pb-0 px-4 flex-col items-center text-center">
                <h4 className="uppercase font-bold my-2">کد تایید را وارد کنید.</h4>
                <div className={"flex flex-row gap-2"}>
                    <img src={"/images/note.svg"} alt="Logo"/>
                    <p className="text-xs my-2">989302220211</p>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2 flex flex-col items-center">
                <form onSubmit={handleSubmit} className={"items-center flex flex-col"}>
                    <InputOtp dir={"ltr"} length={5} value={value} onValueChange={setValue} variant={"bordered"}/>
                    <Button variant={"light"} className={"text-xs"} endContent={<img src={"/images/retry.svg"}/>}>ارسال
                        مجدد کد</Button>
                    <Button type={"submit"}
                            className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default VerificationCodePage;