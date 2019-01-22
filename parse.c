/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parse.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/03 18:17:47 by kblack            #+#    #+#             */
/*   Updated: 2018/12/03 18:17:51 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"


/* 		%	  |	Flags	  |	Minimum field width	| Period	| Precision. Maximum field width  | Argument type
	Required  | Optional  |	     Optional		| Optional	|          Optional				  | Required
*/

// Determine if there is a % in the string
// If there is, check to see if there is a second '%' following the 1st one
	//	if so so something
// Else, check to see what character is next
	// Do something
// if there is no '%' in the string
	// print out the character string

// you should make a parser that looks through your format string
// and finds only %s and %d
// if s then va_arg(char *)
// if d then va_arg(int)
// doesn't have to be perfect, just gotta kinda work

/* FLAGS: '-' left justify					'0' field is padded with 0's instead of blanks
		  '+' sign of number always O/P 	' '	positive values begin with a blank
		  '#' Various uses:
						  %#o (Octal) 0 prefix inserted.
						  %#x (Hex)   0x prefix added to non-zero values.
						  %#X (Hex)   0X prefix added to non-zero values.
						  %#e         Always show the decimal point.
						  %#E         Always show the decimal point.
						  %#f         Always show the decimal point.
						  %#g         Always show the decimal point trailing 
						  	      	  zeros not removed.
						  %#G         Always show the decimal point trailing
							          zeros not removed.
*/

/* If both 0 and - flags are specified, the 0 flag is ignored. */
/* If both + and space character flags are specified, the space character flag is ignored. */

void get_flags(char **pf, pf_token *ftoken)
{
	char *pf_copy;
	int i;

	pf_copy = *pf;
	i = 0;
	while (pf_copy[i] && (pf_copy[i] == '#' || pf_copy[i] == '-' || pf_copy[i] == '+' || pf_copy[i] == ' ' || pf_copy[i] == '0')) //need to check specfier as well (that it isn't some non-flag option)
	{
		if (pf_copy[i] == '#')
			ftoken->hash = 1;
		else if (pf_copy[i] == '-')
			ftoken->left = 1;
		else if (pf_copy[i] == '+')
			ftoken->plus = 1;
		else if (pf_copy[i] == ' ')
			ftoken->space = 1;
		else if (pf_copy[i] == '0')
			ftoken->zero = 1;
		i++;
	}
	if (ftoken->zero == 1 && ftoken->left == 1)
		ftoken->zero = 0;
	if (ftoken->plus == 1 && ftoken->space == 1)
		ftoken->space = 0;
	*pf = (*pf) + i;
}

void get_width(char **pf, pf_token *ftoken)
{
	int i;
	int tmp;

	i = 0;
	ftoken->width = ft_atoi(*pf);
	tmp = ftoken->width;
	while (tmp > 0)
	{
		tmp /= 10;
		i++;
	}
	*pf = (*pf) + i;
}


	/* Set default precision to 6 */
void get_precision(char **pf, pf_token *ftoken)
{
	int i;
	int tmp;

	i = 0;
	if ((**pf) == 'f')
		ftoken->precision = 6U;
	else if ((**pf) == '.')
	{
		{
			*pf = (*pf) + 1;
			ftoken->precision = ft_atoi(*pf);
		}
		tmp = ftoken->precision;
		while (tmp > 0)
		{
			tmp /= 10;
			i++;
		}
	}
	// printf("*pf_copy: ->%c<-\n", **pf);
	*pf = (*pf) + i;
}

void get_length(char **pf, pf_token *ftoken)
{
	char *pf_copy; // if lines are to long can use *(*pf) to save lines 
	int i;

	pf_copy = *pf;
	i = 0;
	if (pf_copy[i] == 'h' || pf_copy[i] == 'l' || pf_copy[i] == 'L' || pf_copy[i] == 'z' || pf_copy[i] == 'j' || pf_copy[i] == 't')
	{
		if(pf_copy[i] == 'h' && pf_copy[i + 1] == 'h')
		{
			ftoken->hh = 1;
			i++;
		}
		else if (pf_copy[i] == 'h')
			ftoken->h = 1;
		if(pf_copy[i] == 'l' && pf_copy[i + 1] == 'l')
		{
			ftoken->ll = 1;
			i++;
		}
		else if (pf_copy[i] == 'l')
			ftoken->l = 1;
		if(pf_copy[i] == 'L')
			ftoken->L = 1;
		if(pf_copy[i] == 'z')
			ftoken->z= 1;
		if(pf_copy[i] == 'j')
			ftoken->j = 1;
		if(pf_copy[i] == 't')
			ftoken->t = 1;
		// *pf = (*pf) + ++i; // ++i accounts for if the length is 2 or 1 characters long 
		i++;
	}
	// printf("*pf_copy: ->%c<-\n", pf_copy[i]);
	*pf = (*pf) + i;
}

void get_type(char **pf, va_list ap, pf_token *ftoken)
{
	char *pf_copy; // if lines are to long can use *(*pf) to save lines 
	int i;

	pf_copy = *pf;
	i = 0;
	// printf("*pf_copy: ->%c<-\n", pf_copy[i]);
	if (pf_copy[i] == 'd' || pf_copy[i] == 'i' || pf_copy[i] == 'f' || pf_copy[i] == 'e' || pf_copy[i] == 'g')
	{
		ftoken->ctype = pf_copy[i];
		pf_signed(pf, ap, ftoken);
	}
	else if (pf_copy[i] == 'u' || pf_copy[i] == 'x' || pf_copy[i] == 'X' || pf_copy[i] == 'o' || pf_copy[i] == 'p' || pf_copy[i] == 'a')
	{
		ftoken->ctype = pf_copy[i];
		pf_unsigned(pf, ap, ftoken);
	}
	else if (pf_copy[i] == 'c' || pf_copy[i] == 's')
	{
		ftoken->ctype = pf_copy[i];
		print_chars(pf, ap);
	}
}

int parse_params(char *pf, va_list ap, pf_token *ftoken)
{	
	get_flags(&pf, ftoken);
	get_width(&pf, ftoken);
	get_precision(&pf, ftoken);
	get_length(&pf, ftoken);
	get_type(&pf, ap, ftoken);

	return (0);
}