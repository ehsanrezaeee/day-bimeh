import './App.css'
import {
    Alert,
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    InputOtp, Radio, RadioGroup, Textarea
} from "@nextui-org/react";
import {useState} from "react";
import {animals} from "./assets/animals.ts";

function App() {
    const [value, setValue] = useState("");

  return (
      <>
          <div className="flex items-center justify-center w-full h-full">
              <img className={"fixed top-0"} src={"/images/Rectangle 1.png"} alt="Rectangle" />
              <img className={"fixed top-10 z-10"} src={"/images/logo.svg"} alt="Logo" />
              <Card shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">
                  <CardHeader className="pb-0 px-4 flex-col items-center text-center">
                      <h4 className="uppercase font-bold my-2">شماره موبایل خود را وارد نمایید.</h4>
                      <p className="text-xs my-2">کد تایید برای شما ارسال خواهد شد</p>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                      <form onSubmit={e => e.preventDefault()}>
                          <Input
                              classNames={{inputWrapper:"rounded-md",label:"text-xs"}}
                              className={"rounded-md"}
                              label="تلفن همراه"
                              labelPlacement={"outside"}
                              placeholder="xxx-xxx-xxx"
                              endContent={<div className={"text-gray-500 text-xs flex flex-row gap-3"}>
                                  <span className={"h-full"}>|</span>
                                  <span>98+</span>
                              </div>}
                          />
                          <Button type={"submit"} className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>
                      </form>
                  </CardBody>
              </Card>
              {/*<Card shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">*/}
              {/*    <CardHeader className="pb-0 px-4 flex-col items-center text-center">*/}
              {/*        <h4 className="uppercase font-bold my-2">کد تایید را وارد کنید.</h4>*/}
              {/*        <div className={"flex flex-row gap-2"}>*/}
              {/*            <img src={"/images/note.svg"} alt="Logo" />*/}
              {/*            <p className="text-xs my-2">989302220211</p>*/}
              {/*        </div>*/}
              {/*    </CardHeader>*/}
              {/*    <CardBody className="overflow-visible py-2 flex flex-col items-center">*/}
              {/*        <InputOtp dir={"ltr"} length={5} value={value} onValueChange={setValue} variant={"bordered"} />*/}
              {/*        <Button variant={"light"} className={"text-xs"} endContent={<img src={"/images/retry.svg"} />}>ارسال مجدد کد</Button>*/}
              {/*        <Button type={"submit"} className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>*/}
              {/*    </CardBody>*/}
              {/*</Card>*/}
              {/*<Alert hideIconWrapper radius={"sm"} classNames={{alertIcon:"bg-red-500 flex items-center justify-center w-7 h-7 rounded-lg",base:"!z-20"}} icon={<div><img src={"/images/alert.svg"}/></div>}*/}
              {/*       color={"danger"} title={`کد وارد شده صحیح نمی باشد`} />*/}
              {/*<Card shadow={"lg"} className="py-2 fixed top-24 z-10 w-[320px]">*/}
              {/*    <CardBody className="overflow-visible py-2 flex flex-col items-center gap-8">*/}
              {/*        <Input*/}
              {/*            variant={"bordered"}*/}
              {/*            classNames={{inputWrapper:"rounded-md",label:"text-xs"}}*/}
              {/*            className={"rounded-md"}*/}
              {/*            label="نام"*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            placeholder="نام را وارد کنید"*/}
              {/*        />*/}
              {/*        <Input*/}
              {/*            variant={"bordered"}*/}
              {/*            classNames={{inputWrapper:"rounded-md",label:"text-xs"}}*/}
              {/*            className={"rounded-md"}*/}
              {/*            label="نام خوانوادگی"*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            placeholder="نام خوانوادگی را وارد کنید"*/}
              {/*        />*/}
              {/*        <Button type={"submit"} className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>*/}
              {/*    </CardBody>*/}
              {/*</Card>*/}
              {/*<Card shadow={"lg"} radius={"sm"} className="py-2 fixed top-24 z-10 w-[320px]">*/}
              {/*    <CardBody className="overflow-visible py-2 flex flex-col items-center gap-2">*/}
              {/*        <Input*/}
              {/*            variant={"bordered"}*/}
              {/*            classNames={{inputWrapper:"rounded-md",label:"text-xs"}}*/}
              {/*            className={"rounded-md"}*/}
              {/*            label="کد نمایندگی"*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            placeholder="نام را وارد کنید"*/}
              {/*        />*/}
              {/*        <Autocomplete*/}
              {/*            radius={"sm"}*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            variant={"bordered"}*/}
              {/*            className="max-w-[300px]]"*/}
              {/*            defaultItems={animals}*/}
              {/*            label="استان"*/}
              {/*            placeholder=""*/}
              {/*        >*/}
              {/*            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}*/}
              {/*        </Autocomplete>*/}
              {/*        <Autocomplete*/}
              {/*            radius={"sm"}*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            variant={"bordered"}*/}
              {/*            className="max-w-[300px]]"*/}
              {/*            defaultItems={animals}*/}
              {/*            label="شهر"*/}
              {/*            placeholder=""*/}
              {/*        >*/}
              {/*            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}*/}
              {/*        </Autocomplete>*/}
              {/*        <Textarea dir={"ltr"} variant={"bordered"} radius={"sm"} label={"آدرس"} className={"mt-6"}/>*/}
              {/*        <Autocomplete*/}
              {/*            radius={"sm"}*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            variant={"bordered"}*/}
              {/*            className="max-w-[300px]]"*/}
              {/*            defaultItems={animals}*/}
              {/*            label="شعبه بیمه"*/}
              {/*            placeholder=""*/}
              {/*        >*/}
              {/*            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}*/}
              {/*        </Autocomplete>*/}
              {/*        <div className={"flex flex-row gap-1 w-full my-6"}>*/}
              {/*            <Input*/}
              {/*                variant={"bordered"}*/}
              {/*                classNames={{inputWrapper:"rounded-md",label:"text-xs"}}*/}
              {/*                className={"rounded-md"}*/}
              {/*                placeholder="نام را وارد کنید"*/}
              {/*            />*/}
              {/*            <Input*/}
              {/*                variant={"bordered"}*/}
              {/*                classNames={{inputWrapper:"rounded-md",label:"text-xs"}}*/}
              {/*                className={"rounded-md w-[70px]"}*/}
              {/*                placeholder="021"*/}
              {/*            />*/}
              {/*        </div>*/}
              {/*        <div className={"flex flex-row gap-3 items-center w-full my-6 text-xs"}>*/}
              {/*            <p>نوع نمایندگی</p>*/}
              {/*            <RadioGroup color={"warning"} orientation={"horizontal"}>*/}
              {/*                <Radio classNames={{label:"text-xs",base:"mx-3"}} value="حقیقی">حقیقی</Radio>*/}
              {/*                <Radio classNames={{label:"text-xs"}} value="حقوقی">حقوقی</Radio>*/}
              {/*            </RadioGroup>*/}
              {/*        </div>*/}
              {/*        <Input*/}
              {/*            variant={"bordered"}*/}
              {/*            classNames={{inputWrapper:"rounded-md",label:"text-xs"}}*/}
              {/*            className={"rounded-md"}*/}
              {/*            label="نام نمایندگی"*/}
              {/*            labelPlacement={"outside"}*/}
              {/*            placeholder="نام نمایندگی را وارد کنید"*/}
              {/*        />*/}
              {/*        <Button type={"submit"} className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ادامه</Button>*/}
              {/*    </CardBody>*/}
              {/*</Card>*/}
          </div>
      </>
  )
}

export default App
