import React, { ChangeEvent, FormEvent, useEffect, useState, useMemo, useCallback } from "react";
import {
    Card,
    CardBody,
    Button,
    Input,
    Autocomplete,
    AutocompleteItem,
    Textarea,
    RadioGroup,
    Radio, Alert, Form,
} from "@heroui/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkAgency, getBranch, getCounties, getProvinces, registerAgent } from "../services/api.ts";
import debounce from 'lodash.debounce';
import { AxiosError } from "axios";
import { ResponseData } from "../services/types.ts";
import Cookies from 'js-cookie';

const AgencyDetailsPage: React.FC = React.memo(() => {
    const navigate = useNavigate();
    const [person, setPerson] = useState("حقیقی");
    const [submissionError, setSubmissionError] = useState<AxiosError<ResponseData>>();
    const [agencyCodeError, setAgencyCodeError] = useState('');
    const [agentCodeSuccess, setAgentCodeSuccess] = useState(false);
    const [provinceId, setProvinceId] = useState('');
    const [countyId, setCountyId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [branchName, setBranchName] = useState('');

    const location = useLocation();

    const { phone_number, firstName, lastName } = location.state || {};

    useEffect(() => {
        if (!phone_number) {
            navigate('/');
        }
        if (!firstName || !lastName) {
            navigate('/personal-info');
        }
    }, [phone_number, navigate, firstName, lastName]);

    const {
        data: provinces,
        error: provincesError,
    } = useQuery({ queryKey: ['provinces'], queryFn: getProvinces });

    const {
        data: counties,
        error: countiesError,
        refetch: refetchCounty
    } = useQuery({ queryKey: ['counties'], queryFn: () => getCounties(provinceId), enabled: !!provinceId });

    const {
        data: branch,
        error: branchError,
        refetch: refetchBranch
    } = useQuery({ queryKey: ['branches'], queryFn: () => getBranch(provinceId, branchName), enabled: !!provinceId });

    useEffect(() => {
        if (provinceId) {
            refetchCounty()
        }
    }, [provinceId, refetchCounty]);

    useEffect(() => {
        if (branchName) {
            refetchBranch()
        }
    }, [branchName, refetchBranch]);

    const checkAgencyCodeMutation = useMutation({
        mutationFn: (code) => checkAgency(code),
        onSuccess: () => {
            setAgentCodeSuccess(true)
            setAgencyCodeError('');
        },
        onError: (error: AxiosError<ResponseData>) => {
            console.log(error)
            setAgentCodeSuccess(false)
            if (error.response && error.response.data && error.response.data) {
                setAgencyCodeError(error.response.data.error_details.fa_details);
            } else {
                setAgencyCodeError('کد نمایندگی قبلا ثبت شده است.');
            }
        },
    });

    const handleChangeAgencyCode = useCallback(
        debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
            checkAgencyCodeMutation.mutate(target.value as unknown as void);
        }, 700),
        [checkAgencyCodeMutation]
    );

    const handleBranchName = useCallback(
        debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
            setBranchName(target.value);
        }, 700),
        []
    );

    const submitMutation = useMutation({
        mutationFn: (formData: Record<string, any>) => registerAgent(formData),
        onSuccess: (data) => {
            console.log(data)
            Cookies.set('SPA_TOKEN', data?.response?.access, { expires: 7 });
            Cookies.set('Ref_TOKEN', data?.response?.refresh, { expires: 30 });
            navigate('/result', { state: data });
        },
        onError: (error: AxiosError<ResponseData>) => {
            console.error(error);
            setSubmissionError(error)
        },
    });

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data['agency_type'] = person
        data['first_name'] = firstName;
        data['last_name'] = lastName;
        data["phone_number"] = phone_number;
        data['province'] = provinceId;
        data['county'] = countyId;
        data['insurance_branch'] = branchId;
        submitMutation.mutate(data);
    }, [person, firstName, lastName, phone_number, provinceId, countyId, branchId, submitMutation]);

    const memoizedProvinces = useMemo(() => provinces, [provinces]);
    const memoizedCounties = useMemo(() => counties, [counties]);
    const memoizedBranch = useMemo(() => branch?.response, [branch]);

    return (
        <>
            {agencyCodeError && <Alert hideIconWrapper radius={"sm"} classNames={{
                alertIcon: "bg-yellow-500 flex items-center justify-center w-7 h-7 rounded-lg",
                base: "!z-20 fixed top-5 w-[300px] text-black",
                title: "text-xs text-start"
            }} icon={<div><img src={"/images/alert.svg"} /></div>}
                                       color={"warning"} title={agencyCodeError} />}
            {submissionError && <Alert hideIconWrapper radius={"sm"} classNames={{
                alertIcon: "bg-red-500 flex items-center justify-center w-7 h-7 rounded-lg",
                base: "!z-20 fixed top-5 w-[300px] text-black",
                title: "text-xs text-start"
            }} icon={<div><img src={"/images/alert.svg"} /></div>}
                                       color={"danger"} title={submissionError?.response?.data?.error_details?.fa_details} />}
            <Card shadow={"lg"} radius={"sm"} className="py-2 fixed top-24 z-10 w-[320px]">
                <CardBody className="overflow-visible py-2 flex flex-col items-center gap-2">
                    <Form validationBehavior={"native"} onSubmit={handleSubmit}
                          className={"items-start flex flex-col w-full gap-4"}>
                        <Input
                            startContent={<p>{agentCodeSuccess && <img src={"/images/checked.svg"} alt={"checked"} />}</p>}
                            variant={"bordered"}
                            classNames={{ inputWrapper: "rounded-md", label: "text-xs" }}
                            className={"rounded-md"}
                            labelPlacement={"outside"}
                            name={"agent_code"}
                            placeholder="کد نمایندگی"
                            onChange={handleChangeAgencyCode}
                            isRequired={true}
                            errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.valueMissing) {
                                    return "لطفا عددی را وارد کنید.";
                                }
                                return validationErrors;
                            }}
                        />
                        {memoizedProvinces && <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]"
                            defaultItems={memoizedProvinces}
                            label="استان"
                            placeholder=""
                            isVirtualized={true}
                            onSelectionChange={key => setProvinceId(String(key))}
                            isRequired={true}
                            errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.valueMissing) {
                                    return "لطفا استان را انتخاب کنید.";
                                }
                                return validationErrors;
                            }}
                        >
                            {(item) => <AutocompleteItem key={item?.id}>{item?.name}</AutocompleteItem>}
                        </Autocomplete>}
                        {provincesError && <p className={"text-xs text-danger my-1"}>{provincesError.message}</p>}
                        <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]"
                            defaultItems={memoizedCounties ? memoizedCounties : []}
                            label="شهر"
                            placeholder=""
                            isDisabled={!provinceId}
                            isVirtualized={true}
                            onSelectionChange={key => setCountyId(String(key))}
                            isRequired={true}
                            errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.valueMissing) {
                                    return "لطفا شهر را انتخاب کنید.";
                                }
                                return validationErrors;
                            }}
                        >
                            {(item) => <AutocompleteItem key={item?.id}>{item?.name}</AutocompleteItem>}
                        </Autocomplete>
                        {countiesError && <p className={"text-xs text-danger my-1"}>{countiesError.message}</p>}
                        <Textarea errorMessage={({ validationDetails, validationErrors }) => {
                            if (validationDetails.valueMissing) {
                                return "لطفا آدرس را وارد کنید.";
                            }
                            return validationErrors;
                        }} isRequired={true} name={"address"} variant={"bordered"} radius={"sm"} label={"آدرس"} className={"mt-2"} />
                        <Autocomplete
                            radius={"sm"}
                            labelPlacement={"outside"}
                            variant={"bordered"}
                            className="max-w-[300px]"
                            defaultItems={memoizedBranch ? memoizedBranch : []}
                            label="شعبه بیمه"
                            placeholder=""
                            isVirtualized={true}
                            isDisabled={!provinceId}
                            onInput={handleBranchName}
                            onSelectionChange={key => setBranchId(String(key))}
                            isRequired={true}
                            errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.valueMissing) {
                                    return "لطفا شعبه بیمه را انتخاب کنید.";
                                }
                                return validationErrors;
                            }}
                        >
                            {(item) => <AutocompleteItem key={item?.id}>{item?.name}</AutocompleteItem>}
                        </Autocomplete>
                        {branchError && <p className={"text-xs text-danger my-1"}>{branchError.message}</p>}
                        <div className={"flex flex-row gap-1 w-full my-3"}>
                            <Input
                                variant={"bordered"}
                                classNames={{ inputWrapper: "rounded-md", label: "text-xs" }}
                                className={"rounded-md"}
                                placeholder="تلفن ثابت"
                                labelPlacement={"outside"}
                                label={"تلفن ثابت"}
                                name={"phone"}
                                isRequired={true}
                                errorMessage={({ validationDetails, validationErrors }) => {
                                    if (validationDetails.valueMissing) {
                                        return "لطفا شماره تلفن ثابت را وارد کنید.";
                                    }
                                    return validationErrors;
                                }}
                            />
                            <Input
                                variant={"bordered"}
                                classNames={{ inputWrapper: "rounded-md", label: "text-xs" }}
                                className={"rounded-md w-[70px]"}
                                placeholder="021"
                                labelPlacement={"outside"}
                                label={"کد"}
                                name={"city_code"}
                                isRequired={true}
                                errorMessage={({ validationDetails, validationErrors }) => {
                                    if (validationDetails.valueMissing) {
                                        return "اجباری";
                                    }
                                    return validationErrors;
                                }}
                            />
                        </div>
                        <div className={"flex flex-row gap-3 items-center w-full my-3 text-xs"}>
                            <p>نوع نمایندگی</p>
                            <RadioGroup errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.valueMissing) {
                                    return "لطفا یکی را انتخاب کنید.";
                                }
                                return validationErrors;
                            }} isRequired={true} value={person} onValueChange={setPerson} color={"danger"} orientation={"horizontal"}>
                                <Radio classNames={{ label: "text-xs", base: "mx-3" }} value="real">حقیقی</Radio>
                                <Radio classNames={{ label: "text-xs" }} value="legal">حقوقی</Radio>
                            </RadioGroup>
                        </div>
                        {person == "legal" && <Input
                            variant={"bordered"}
                            classNames={{ inputWrapper: "rounded-md", label: "text-xs" }}
                            className={"rounded-md"}
                            label="نام حقوقی"
                            name={"Name"}
                            labelPlacement={"outside"}
                            placeholder="نام حقوقی را وارد کنید"
                            isRequired={true}
                            errorMessage={({ validationDetails, validationErrors }) => {
                                if (validationDetails.valueMissing) {
                                    return "لطفا نام حقوقی کنید.";
                                }
                                return validationErrors;
                            }}
                        />}
                        <Button type={"submit"} isLoading={submitMutation?.isPending} className={"w-full mt-4 bg-[#017785] text-white rounded-md"}>ثبت نام</Button>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
});

export default AgencyDetailsPage;

