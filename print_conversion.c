/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_conversion.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/22 14:39:22 by kblack            #+#    #+#             */
/*   Updated: 2019/01/22 14:39:24 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void get_width(const char *fmt, pf_token *pf)
{
	int tmp;

	pf->flag.width = ft_atoi(&fmt[pf->i]);
	tmp = pf->flag.width;
	while (tmp > 0)
	{
		tmp /= 10;
		pf->i++;
	}
}

void get_precision(const char *fmt, pf_token *pf)
{
	int tmp;

	pf->flag.dot = 1;
	pf->i++;
	if (fmt[pf->i] == 'f')
		pf->flag.prec = 6U;
	else if (fmt[pf->i] == 's')
		pf->flag.prec = -1;
	else
	{
		pf->flag.prec = ft_atoi(&fmt[pf->i]);
		tmp = pf->flag.prec;
		if (tmp == 0 && (fmt[pf->i] >= '0' && fmt[pf->i] <= '9'))
			pf->i++;
		while (tmp > 0)
		{
			tmp /= 10;
			pf->i++;
		}
	}
}

void get_length(const char *fmt, pf_token *pf)
{
	if(fmt[pf->i] == 'h' && fmt[pf->i + 1] == 'h')
	{
		pf->u.hh = 1;
		pf->i++;
	}
	else if (fmt[pf->i] == 'h')
		pf->u.h = 1;
	if(fmt[pf->i] == 'l' && fmt[pf->i + 1] == 'l')
	{
		pf->u.ll = 1;
		pf->i++;
	}
	else if (fmt[pf->i] == 'l')
		pf->u.l = 1;
	if(fmt[pf->i] == 'L')
		pf->u.L = 1;
	pf->i++;
}

void get_flags(const char *fmt, pf_token *pf)
{
	while (ft_strchr(FLAGS, fmt[pf->i]))
	{
		(fmt[pf->i] == '#') ? pf->flag.hash = 1 : 0;
		(fmt[pf->i] == '-') ? pf->flag.left = 1 : 0;
		(fmt[pf->i] == '+') ? pf->flag.plus = 1 : 0;
		(fmt[pf->i] == ' ') ? pf->flag.space = 1 : 0;
		(fmt[pf->i] == '0') ? pf->flag.zero = 1 : 0;
		if (fmt[pf->i] >= '0' && fmt[pf->i] <= '9')
			get_width(fmt, pf);
		else if (fmt[pf->i] == '.')
			get_precision(fmt, pf);
		else
			get_length(fmt, pf);
	}
}

void get_type(const char *fmt, va_list ap, pf_token *pf)
{
	if (fmt[pf->i] == 'd' || fmt[pf->i] == 'i' || fmt[pf->i] == 'f')
	{
		pf->ctype = fmt[pf->i];
		signed_int_handler(fmt, ap, pf);
	}
	else if (fmt[pf->i] == 'u' || fmt[pf->i] == 'x' || fmt[pf->i] == 'X' || fmt[pf->i] == 'o' || fmt[pf->i] == 'p')
	{
		pf->ctype = fmt[pf->i];
		unsigned_int_handler(fmt, ap, pf);
	}
	else if (fmt[pf->i] == 'c' || fmt[pf->i] == 's' || fmt[pf->i] == '%')
	{
		pf->ctype = fmt[pf->i];
		ascii_handler(fmt, ap, pf);
	}
}

void print_conversion(const char *fmt, va_list ap, pf_token *pf)
{
	ft_bzero(&pf->flag, sizeof(pf->flag));
	pf->i++;
	get_flags(fmt, pf);
	// get_width(fmt, pf);
	// get_precision(fmt, pf);
	// get_length(fmt, pf);
	get_type(fmt, ap, pf);
	pf->i++;
}

// void get_flags(const char *fmt, pf_token *pf)
// {
// 	while (fmt[pf->i] && (fmt[pf->i] == '#' || fmt[pf->i] == '-' || fmt[pf->i] == '+' || fmt[pf->i] == ' ' || fmt[pf->i] == '0'))
// 	{
// 		if (fmt[pf->i] == '#')
// 			pf->flag.hash = 1;
// 		else if (fmt[pf->i] == '-')
// 			pf->flag.left = 1;
// 		else if (fmt[pf->i] == '+')
// 			pf->flag.plus = 1;
// 		else if (fmt[pf->i] == ' ')
// 			pf->flag.space = 1;
// 		else if (fmt[pf->i] == '0')
// 			pf->flag.zero = 1;
// 		pf->i++;
// 	}
// 	if (pf->flag.left == 1 && pf->flag.zero == 1)
// 		pf->flag.zero = 0;
// 	if (pf->flag.plus == 1 && pf->flag.space == 1)
// 		pf->flag.space = 0;
// }

// void get_length(const char *fmt, pf_token *pf)
// {
// 	if (fmt[pf->i] == 'h' || fmt[pf->i] == 'l' || fmt[pf->i] == 'L' || fmt[pf->i] == 'z' || fmt[pf->i] == 'j' || fmt[pf->i] == 't')
// 	{
// 		if(fmt[pf->i] == 'h' && fmt[pf->i + 1] == 'h')
// 		{
// 			pf->u.hh = 1;
// 			pf->i++;
// 		}
// 		else if (fmt[pf->i] == 'h')
// 			pf->u.h = 1;
// 		if(fmt[pf->i] == 'l' && fmt[pf->i + 1] == 'l')
// 		{
// 			pf->u.ll = 1;
// 			pf->i++;
// 		}
// 		else if (fmt[pf->i] == 'l')
// 			pf->u.l = 1;
// 		if(fmt[pf->i] == 'L')
// 			pf->u.L = 1;
// 		pf->i++;
// 	}
// }
