/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_float.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/25 12:57:52 by kblack            #+#    #+#             */
/*   Updated: 2019/01/25 12:58:03 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

long double find_double_size(va_list ap, pf_token *pf)
{
	long double length;

	if (pf->u.L)
		length = va_arg(ap, long double);
	else
		length = va_arg(ap, double);
	return (length);
}

long get_decimal(long double num, int prec)
{
	int sign;
	int i;

	i = 0;
	sign = (num < 0) ? -1 : 1;
	num *= sign;
	while (i < prec)
	{
		num *= 10;
		i++;
	} 	
	num += 0.5;
	num *= sign;
	return ((long)num);	
}

char *handle_flt_prec(int dot, char *str, int len, pf_token *pf)
{
	char *tmp;
	int i;
	int j;

	i = 0;
	j = 0;
	tmp = ft_strnew(len + pf->flag.hash + 1);
	while (len >= 0)
	{
		if (i == dot && len > 0)
			tmp[j++] = '.';
		if (i >= len)
		{
			tmp[j] = '\0';
			break;
		}
		tmp[j++] = str[i]; 
		i++;
	}
	return (tmp);
}

void get_float_precision(long double num, pf_token *pf)
{	
	int prec;
	long deci;

	pf->f.whole = ft_ltoa(num);
	num == 0 ? pf->flag.prec-- : 0;
	prec = ft_strlen(pf->f.whole);
	deci = get_decimal(num, pf->flag.prec);
	pf->f.wd = (num == 0 ? ft_strdup("000000") : ft_ftoa(deci));
	if (pf->flag.prec == 0 && pf->flag.hash == 1)
		pf->f.str = handle_flt_prec(prec, pf->f.wd, prec + pf->flag.prec, pf);
	else if (pf->flag.prec == 0 )
		pf->f.str = ft_strdup(pf->f.whole);
	else
		pf->f.str = handle_flt_prec(prec, pf->f.wd, prec + pf->flag.prec, pf);
}

void print_float_width(pf_token *pf)
{
	int i;
	int len;

	i = 0;
	len = ft_strlen(pf->f.str + pf->flag.plus + pf->flag.space);
	if (pf->flag.prec >= 0)
	{
		while (pf->flag.width - i++ > len)
			pf->out += pf->flag.zero == 1 ? write(1, "0",1) : write(1, " ", 1);
		i = 0;
		while ((int)ft_strlen(pf->f.str) < len - i++)
			pf->out += write(1, "0", 1);
	}
	else
		while (pf->flag.width - i++ > len)
			pf->out += pf->flag.zero == 1 ? write(1, "0",1) : write(1, " ", 1);
}

/* MAY NEED TO FREE PF->F.WHOLE!!! */
void print_float(va_list ap, pf_token *pf)
{
	long double num;

	ft_bzero(&pf->f, sizeof(pf->f));
	num = find_double_size(ap, pf);
	get_float_precision(num, pf);
	if (pf->flag.left == 1)
	{
		if (num > 0 && (pf->flag.plus == 1 || pf->flag.space == 1))
			pf->out += (pf->flag.plus == 1 ? write(1, "+", 1) : write(1, " ", 1));
		pf->out += write(1, pf->f.str, ft_strlen(pf->f.str));
		print_float_width(pf);
	}
	else
	{
		print_float_width(pf);
		if (num > 0 && (pf->flag.plus == 1 || pf->flag.space == 1))
			pf->out += (pf->flag.plus == 1 ? write(1, "+", 1) : write(1, " ", 1));
		pf->out += write(1, pf->f.str, ft_strlen(pf->f.str));
	}
	pf->i++;
	free(pf->f.str);
	free(pf->f.wd);
}