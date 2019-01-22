/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_unsigned_int.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/10 22:25:04 by kblack            #+#    #+#             */
/*   Updated: 2018/12/10 22:25:06 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

/* uintmax_t is an unsigned integer which is the greatest upported width; they are
 * the integer types which have the greatest limits */

uintmax_t find_ulength_size(va_list ap, pf_token *ftoken)
{
	uintmax_t length;

	if (ftoken->ll || ftoken->ctype == 'p')
		length = (uintmax_t)va_arg(ap, unsigned long long);
	else if (ftoken->l)
		length = (uintmax_t)va_arg(ap, unsigned long);
	else if (ftoken->hh)
		length = (uintmax_t)(unsigned char)va_arg(ap, unsigned int);
	else if (ftoken->h)
		length = (uintmax_t)(unsigned short)va_arg(ap, unsigned int);
	else
		length = (uintmax_t)va_arg(ap, unsigned int);
	return (length);
}

void pf_base16(va_list ap, pf_token *ftoken, type_token *type)
{
	printf("---- ENTERING pf_base16 ----\n");
	/* needs to be changed from an int into a char in order to be written */
	uintmax_t num;
	static char *int_str;
	static short i;

	num = find_ulength_size(ap, ftoken);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i);	/* create block of memory */
	int_str[i] = '\0';	
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		if (type->x || type->p)
			int_str[i] = HEX[num & 0xF];
		else
			int_str[i] = HEX_UPPER[num & 0xF];
		num >>= 4;
	}
	while (int_str[++i] == '0')
		;
	if (!int_str[i])
			ft_putchar('0');
	if (type->p)
	{
		int_str[--i] = 'x';
		int_str[--i] = '0';
	}
	while (int_str[i])
	{
		ft_putchar(int_str[i]);
		i++;
	}
}

void pf_base10(va_list ap, pf_token *ftoken)
{
	printf("---- ENTERING pf_pf_base10 ----\n");
	/* needs to be changed from an int into a char in order to be written */
	uintmax_t num;
	static char *int_str;
	static short i;

	num = find_ulength_size(ap, ftoken);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i);	/* create block of memory */
	int_str[i] = '\0';	
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		int_str[i] = num % 10 + '0';
		num /= 10;
	}
	while (int_str[++i] == '0')
		;
	while (int_str[i])
	{
		ft_putchar(int_str[i]);
		i++;
	}
}

void pf_base8(va_list ap, pf_token *ftoken)
{
	printf("---- ENTERING pf_base8 ----\n");
	uintmax_t num;
	static char *int_str;
	static short i;

	num = find_ulength_size(ap, ftoken);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i);	/* create block of memory */
	int_str[i] = '\0';
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		int_str[i] = OCTAL[num & 0x7];
		num >>= 3;
	}
	while (int_str[++i] == '0')
		;
	if (!int_str[i])
			ft_putchar('0');
	while (int_str[i])
	{
		ft_putchar(int_str[i]);
		i++;
	}
}


void pf_unsigned(char **pf, va_list ap, pf_token *ftoken)
{
	type_token type;

	ft_bzero(&type, sizeof(type)); /* ft_bzero to reset all type flags */
	if (*(*pf) == 'o') /* unsigned octal */
		pf_base8(ap, ftoken);
	else if (*(*pf) == 'u')	/* unsigned deciaml integer */
		pf_base10(ap, ftoken);
	else if (*(*pf) == 'x')	 /* unsigned hexadecimal integer, lowercase */
	{
		type.x = 1;
		pf_base16(ap, ftoken, &type);
	}
	else if (*(*pf) == 'X')  /* unsigned hexadecimal integer, uppercase */
	{
		type.X = 1;
		pf_base16(ap, ftoken, &type);
	}
	else if (*(*pf) == 'p')	/* pointer address */
	{
		type.p = 1;
		pf_base16(ap, ftoken, &type);
	}
	// else if (*(*pf) == 'a') /* hexadecimal floating point, lowercase */
	// 	pf_char(ap);
	// else if (*(*pf) == 'A') /* hexadecimal floating point, uppercase */
	// 	pf_char(ap);
}