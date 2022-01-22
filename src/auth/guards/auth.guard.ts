import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from "jsonwebtoken";



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        const query = context.getHandler().name;
        const request = context.switchToHttp().getRequest();

        if (query === "signInTechnician" || query === "createTechnician" || query === "createOrder") {
            return true;
        }

        if (request.headers.authorization !== undefined) {
            const authorization = request.headers.authorization;
            try {
                jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET);
            } catch (error) {
                throw new UnauthorizedException(error);
            }
        } else {
            throw new UnauthorizedException("No autorizado");
        }
        return true;
    }
}
