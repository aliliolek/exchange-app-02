import { ClockIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { Chip } from "@nextui-org/react";

interface RateAndTimerProps {
    currencyFrom: string;
    currencyTo: string;
    rate: number;
    minutes: number;
    seconds: number;
}

export const RateAndTimer = ({ currencyFrom, currencyTo, rate, minutes, seconds }: RateAndTimerProps) => {
    return (
        <div className="form__item-container rate flex flex-row gap-4">
            <div className="flex items-center min-w-48">
                <span className="text-sm">
                    {`Rate: 1 ${currencyFrom} = `}&nbsp;
                </span>
                <Chip radius="sm" className="text-sm" color="success" variant="bordered" startContent={<CreditCardIcon className="w-4 h-4"/>}>
                    {rate.toFixed(6)}
                </Chip>
                <span className="text-sm">&nbsp;{`${currencyTo} `}</span>
            </div>
            <div className="flex items-center">
                <Chip radius="sm" className="text-sm" startContent={<ClockIcon className="w-4 h-4"/>} color="danger" variant="bordered">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Chip>
            </div>
        </div>
    );
};