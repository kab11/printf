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

void pf_dec(va_list ap)
{
	printf("---- ENTERING pf_dec ----\n");
	/* needs to be changed from an int into a char in order to be written */
	unsigned int num;
	static char *int_str;
	static short i;

	num = va_arg(ap, unsigned int);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i + 1);	/* create block of memory */
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

void pf_hex_oct(va_list ap, type_token type)
{
	printf("---- ENTERING pf_hex_oct ----\n");
	unsigned int num;
	static char *int_str;
	static short i;

	num = va_arg(ap, unsigned int);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i + 1);	/* create block of memory */
	int_str[i] = '\0';
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		if (type.x || type.X)
		{
			if (type.x)
				int_str[i] = HEX_LOWER[num & 0xF];
			else
				int_str[i] = HEX_UPPER[num & 0xF];
			num >>= 4;
		}
		if (type.o)
		{
			int_str[i] = OCTAL[num & 1111];
			num >>= 3;
		}
	}
	while (int_str[++i] == '0')
		;
	while (int_str[i])
	{
		ft_putchar(int_str[i]);
		i++;
	}
}

void pf_unsigned(const char **pf, va_list ap)
{
	type_token type;

	ft_bzero(&type, sizeof(type)); /* ft_bzero to reset all type flags */
	if (*(*pf) == 'u')	/* unsigned deciaml integer */
		pf_dec(ap);
	else if (*(*pf) == 'x')	 /* unsigned hexadecimal integer, lowercase */
	{
		type.x = 1;
		pf_hex_oct(ap, type);
	}
	else if (*(*pf) == 'X') /* unsigned hexadecimal integer, uppercase */
	{
		type.X = 1;
		pf_hex_oct(ap, type);
	}
	else if (*(*pf) == 'o') /* unsigned octal */
	{
		type.o = 1;
		pf_hex_oct(ap, type);
	}
	// else if (*(*pf) == 'p')	/* pointer address */
	// 	pf_char(ap);
	// else if (*(*pf) == 'a') /* hexadecimal floating point, lowercase */
	// 	pf_char(ap);
	// else if (*(*pf) == 'A') /* hexadecimal floating point, uppercase */
	// 	pf_char(ap);
}