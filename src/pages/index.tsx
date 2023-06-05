import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ssApi } from "../../api";
import { en, es } from "../../messages";
import { validations } from "../../utils";

const inter = Inter({ subsets: ["latin"] });

interface FormData {
	mail: string;
	password: string;
}

export default function Home() {
	const router = useRouter();
	const t = router.locale === "en" ? en : es;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onLoginUser = async (form: FormData) => {
		const isValidLogin = await ssApi({
			method: "POST",
			url: "/",
			data: form,
		});

		// console.log(isValidLogin.data.user.name);

		if (!isValidLogin) {
			setTimeout(() => {
				alert("Login failed");
			}, 3000);
			return;
		}

		router.push("/welcom");
	};

	const handleChange = (e: { target: { value: string } }) => {
		console.log(e.target.value);
		router.push(router.pathname, router.pathname, { locale: e.target.value });
	};

	return (
		<div>
			<section className='hero is-primary is-fullheight'>
				<div className='hero-body'>
					<div className='container'>
						<div className='columns is-centered'>
							<div className='column is-5-tablet is-4-desktop is-3-widescreen'>
								<form
									noValidate
									className='box'
									onSubmit={handleSubmit(onLoginUser)}
								>
									<div className="select is-link">
										<select onChange={handleChange}>
											<option value="es">Español</option>
											<option value="en">Ingles</option>
										</select>
									</div>

									<div className='has-text-centered'>
										<label className='label'>{t.login.title}</label>
									</div>

									<div className='field'>
										<label className='label'>{t.login.email}</label>
										<div className='control has-icons-left'>
											<input
												type='email'
												placeholder='mail@gmail.com'
												className='input'
												{...register("mail", {
													required: "Este campo es requerido",
													validate: validations.isEmail,
												})}
											/>
											<span className='icon is-small is-left'>
												<i className='fa fa-envelope' />
											</span>
										</div>
									</div>
									<div className='field'>
										<label className='label'>{t.login.password}</label>
										<div className='control has-icons-left'>
											<input
												type='password'
												placeholder='*******'
												className='input'
												{...register("password", {
													required: "Este campo es requerido",
													minLength: {
														value: 6,
														message: "Míniomo 6 caracteres",
													},
												})}
											/>
											<span className='icon is-small is-left'>
												<i className='fa fa-lock' />
											</span>
										</div>
									</div>
									<div className='field'>
										<button className='button is-success'>
											{t.login.submit}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
