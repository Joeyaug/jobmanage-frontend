import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message, user_state } from "../../global-state";
import { handle_register } from "../../services/user";


const useRegister = () => {
  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)
  const set_user = useSetRecoilState(user_state)

  return  useMutation((payload)=>handle_register(payload), {
      onSuccess: data => {

        window.localStorage.setItem("token", data.token);
        set_user(data)
        
        set_success('Successfully registered!')
        setTimeout(() => {
          set_success('')
        }, 4000);

      },
      onError: () => {
        set_error('User with this email already exists!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useRegister;