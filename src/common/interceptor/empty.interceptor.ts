import { CallHandler, ExecutionContext, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class EmptyInterceptor implements NestInterceptor {
    intercept (context : ExecutionContext, next: CallHandler) : Observable<any> {
        return next.handle()
                .pipe(
                    tap (data => {
                        if (data === undefined || data?.length === 0 || !data) {
                            throw new NotFoundException()
                        }
                    })
                )
    }
}