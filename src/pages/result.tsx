import {Button, Link} from "@nextui-org/react";

export default function Results() {
    return <div className={"fixed bottom-0 h-48 w-[375px] rounded-tr-2xl rounded-tl-2xl bg-gray-100 z-30"}>
        <div className={"text-right p-2 mt-2"}>نماینده محترم:</div>
        <div className={"mt-1 p-2"}>درخواست ثبت نام شما در حال بررسی است. درصورت تایید اطلاعات، اپلیکیشن مورد نظر فعال خواهد شد.</div>
        <Button as={Link} href={"/"} className={"mt-4 bg-[#017785] w-[300px] text-white rounded-md hover:text-white"}>ورورد با حساب کاربری دیگر</Button>
    </div>
}