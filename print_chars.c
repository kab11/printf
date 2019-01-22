/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_chars.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/10 22:25:22 by kblack            #+#    #+#             */
/*   Updated: 2018/12/10 22:25:27 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* 
 * BITWISE OPERATORS 
 * opertors can only be applied to integral operands 'char, short, int, long'
 * ~left shift x << 2 is equivalent to multiply by 4 (fills vacated bits with zeros) (x * 2^shift)
 * ~right shift >> ; if unsigned fills vacated bits with zero; if signed it will fill (x / 2^shift)
 *  vacated bits with sign bits ("arithmatic shift") OR with 0-bits ("logical shift")
 *  depending on the computer 
*/

#include "ft_printf.h"

void pf_char(va_list ap)
{   
	// printf("---- ENTERING pf_chars ----\n");
	char ch;

	ch = va_arg(ap, int);
	if (!ch)
		write(1, "(null)\n", 7);
	else
		write(1, &ch, 1);
}

void pf_str(va_list ap)
{
	// printf("---- ENTERING pf_str ----\n");
	char *str;

	str = va_arg(ap, char*);
	if (!str)
		write(1, "(null)\n", 7);
	else	
		write(1, str, ft_strlen(str));
}

void print_chars(char **pf, va_list ap)
{
	if (*(*pf) == 'c')
		pf_char(ap);
	else if (*(*pf) == 's')
		pf_str(ap);
}