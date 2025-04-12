import {Button, Link} from "@heroui/react";
import Cookies from 'js-cookie';
import {useQuery} from "@tanstack/react-query";
import {checkStatus} from "../services/api.ts";

export default function Results() {
    const Acc_Token = Cookies.get("SPA_TOKEN");
    const {
        data: status,
        error: statusError,
    } = useQuery({queryKey: ['status'], queryFn: () => checkStatus(Acc_Token)});

    return <div className={"fixed bottom-0 h-48 w-[375px] rounded-tr-2xl rounded-tl-2xl bg-gray-100 z-30"}>
        {statusError && <p className={"p-4"}>{statusError.message}</p>}
        {status && !statusError && <div>
            <div className={"text-right p-2 mt-2"}>نماینده محترم:</div>
            <div className={"mt-1 p-2"}>درخواست ثبت نام شما در حال بررسی است. درصورت تایید اطلاعات، اپلیکیشن مورد نظر
                فعال خواهد شد.
            </div>
            <Button as={Link} href={"/"}
                    className={"mt-4 bg-[#017785] w-[300px] text-white rounded-md hover:text-white"}>ورورد با حساب
                کاربری دیگر</Button>
        </div>}

    </div>
}