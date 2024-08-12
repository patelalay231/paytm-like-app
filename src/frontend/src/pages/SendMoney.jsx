import {SendMoneyComponent} from '../components'

function SendMoney() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <SendMoneyComponent/>
            </div>
        </div>
  )
}

export default SendMoney