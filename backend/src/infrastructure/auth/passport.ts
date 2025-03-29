import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { UserService } from '@/domain/services/user.service';
import logger from '@/infrastructure/logger';
import { JWT_SECRET } from '@/infrastructure/config/env';

export const configurePassport = () => {
	const userService = container.get<UserService>(TYPES.UserService);

	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromExtractors([
					ExtractJwt.fromAuthHeaderAsBearerToken(),
					(req) => req.cookies?.token,
				]),
				secretOrKey: JWT_SECRET,
			},
			async (jwtPayload, done) => {
				try {
					const user = await userService.getUserById(jwtPayload.userId);
					if (!user) {
						return done(null, false);
					}
					return done(null, user);
				} catch (error) {
					logger.error('JWT error:', error);
					return done(error, false);
				}
			},
		),
	);

	passport.serializeUser((user: any, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id: string, done) => {
		try {
			const user = await userService.getUserById(id);
			done(null, user);
		} catch (error) {
			done(error, null);
		}
	});

	return passport;
};
