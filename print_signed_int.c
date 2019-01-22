/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_signed_int.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/10 22:24:50 by kblack            #+#    #+#             */
/*   Updated: 2018/12/10 22:24:52 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"


/* doesn't handle INT_MIN but dose handle INT_MAx*/
intmax_t find_length_size(va_list ap, pf_token *ftoken)
{
	intmax_t length;

	if (ftoken->ll)
		length = (intmax_t)va_arg(ap, long long);
	else if (ftoken->l)
		length = (intmax_t)va_arg(ap, long);
	else if (ftoken->hh)
		length = (intmax_t)(char)va_arg(ap, int);
	else if (ftoken->h)
		length = (intmax_t)(short)va_arg(ap, int);
	else
		length = (intmax_t)va_arg(ap, int);
	return (length);
}

/* Need to figure out how to integrate this with find_length_size */
void find_double_size(va_list ap, pf_token *ftoken, long double *num)
{
	if (ftoken->L)
		*num = va_arg(ap, long double);
	else
		*num = va_arg(ap, double);
}

void build(long double *num, t_pf_store *f, pf_token *ftoken)
{
	printf("here\n");
	int prec_len;
	int int_len;
	int len;
	int j;

	j = -1;
	int_len = ft_strlen(f->str);
	prec_len = ft_strlen(f->decimal_str);
	len = int_len + prec_len;
	ftoken->hash == 1 || ftoken->precision > 0 ? len++ : 0;
	if (ftoken->left == 1)
	{
		if (*num > 0 && (ftoken->plus == 1 || ftoken->space == 1))
			f->ret += (ftoken->plus == 1 ? write(1, "+", 1) : write(1, " ", 1));
		f->ret += write(1, f->str, int_len);
		f->ret += (ftoken->hash == 1 || ftoken->precision > 0 ? write(1, ".", 1) : 0);
		f->ret += write(1, f->decimal_str, prec_len);
		len += ftoken->plus + ftoken->space;
		if ((int)ftoken->precision >= 0)
		{
			while ((int)ftoken->width - ++j > int_len)
				f->ret += ftoken->zero ? write(1, "0", 1) : write(1, " ", 1);
			j = -1;
			// while ((int)ft_strlen())
		}
	}
	else
	{
		printf("here\n");
		if (*num > 0 && (ftoken->plus == 1 || ftoken->space == 1))
		{
			f->ret += (ftoken->plus == 1 ? write(1, "+", 1) : write(1, " ", 1));
			len++;
		}
		if ((int)ftoken->precision >= 0)
		{
			while ((int)ftoken->width - ++j > len)
				f->ret += ftoken->zero ? write(1, "0", 1) : write(1, " ", 1);
			j = -1;
			// while ()
		}
		f->ret += write(1, f->str, int_len);
		f->ret += (ftoken->hash == 1 || ftoken->precision > 0 ? write(1, ".", 1) : 0);
		f->ret += write(1, f->decimal_str, prec_len);
	}
}

void float_prec(long double *num, t_pf_store *f, pf_token *ftoken)
{
	// printf("num: %.19Lf\t whole: %ld\t token: %d\n", *num, f->whole, ftoken->width);
	int len;

	f->sign = (*num < 0) ? -1 : 1;
	f->deci = *num - (long)*num;
	if (f->deci > 0)
	{
		len = ftoken->precision;
		f->decimal_str = ft_strnew(len + 1);
		while (--len >= 0)
			f->deci *= 10;
		len = ftoken->precision;
		f->deci += 0.5;
		while (--len >= 0)
		{
			f->decimal_str[len] = (long)f->deci % 10 + '0';
			f->deci /= 10;
		}
	}
	else if (ftoken->precision == 6U)
		f->decimal_str = ft_strdup("000000");
	// printf("deci string: %s\n", f->decimal_str);
	build(num, f, ftoken);
}

void pf_float(va_list ap, pf_token *ftoken)
{
	long double num;
	t_pf_store f;
	int i;
	long tmp;

	ft_bzero(&f, sizeof(f));
	find_double_size(ap, ftoken, &num);
	f.whole = (long)num;
	i = 1;
	f.whole < 0 ? i++ : 0; /* account for negative sign */
	tmp = f.whole < 0 ? -f.whole : f.whole;
	while (tmp > 9) /* length of integer */
	{
		tmp /= 10;
		i++;
	}
	f.str = ft_strnew(i);
	f.whole < 0 ? *f.str = '-' : 0;
	f.whole < 0 ? f.whole = -f.whole : 0;
	f.str = ft_itoa(f.whole);
	float_prec(&num , &f, ftoken);
}

void pf_int(va_list ap, pf_token *ftoken)
{
	printf("---- ENTERING pf_int ----\n");
	/* needs to be changed from an int into a char in order to be written */
	intmax_t num;
	static char *int_str;
	static short i;
	static short sign;

	num = find_length_size(ap, ftoken);
	// printf("num: %jd\n", num);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i);	/* create block of memory */
	sign = (num < 0 ? -1 : 1);	/* determine if number is less than 0 */
	int_str[i] = '\0';
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		if (int_str[i] != '-')
		{	
			int_str[i] = ft_abs(num) % 10 + '0'; /* need to find abs of num; otherise its only returns junk values */
			num /= 10;
		}
	}
	while (int_str[++i] == '0')
		;
	if (sign == -1)
		ft_putchar('-');
	while (int_str[i])
		ft_putchar(int_str[i++]);
	/* work backwards (write? return?)*/
}


void pf_signed(char **pf, va_list ap, pf_token *ftoken)
{
	if (*(*pf) == 'd' || *(*pf) == 'i') /* signed decimal integer */
		pf_int(ap, ftoken);
	else if (*(*pf) == 'f')     /* Decimal floating point, lowercase */
		pf_float(ap, ftoken);
}

