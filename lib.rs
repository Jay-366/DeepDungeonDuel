use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("AP62gFAAsUSdKqCxhgkzyqGxwbP5Hhs4SBSUb4ARtXyz");

#[program]
pub mod game_reward_system {
    use super::*;

    pub fn play_game(ctx: Context<PlayGame>, win: bool, transferred_amount: u64) -> Result<()> {
        // Use the transferred_amount passed by the client
        let fee_amount: u64 = transferred_amount;

        if win {
            // Transfer SOL from vault PDA to user
            let vault_seeds = &[
                b"vault",
                ctx.accounts.authority.key.as_ref(),
                &[ctx.bumps.vault],
            ];
            let signer = &[&vault_seeds[..]];

            anchor_lang::solana_program::program::invoke_signed(
                &system_instruction::transfer(
                    ctx.accounts.vault.key,
                    ctx.accounts.user.key,
                    transferred_amount,
                ),
                &[
                    ctx.accounts.vault.to_account_info(),
                    ctx.accounts.user.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
                signer,
            )?;
        } else {
            // Transfer fee from user to vault if they lose
            anchor_lang::solana_program::program::invoke(
                &system_instruction::transfer(
                    ctx.accounts.user.key,
                    ctx.accounts.vault.key,
                    fee_amount,
                ),
                &[
                    ctx.accounts.user.to_account_info(),
                    ctx.accounts.vault.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
            )?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 8, // discriminator + u64
        seeds = [b"config"],
        bump
    )]
    pub config: Account<'info, GameConfig>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlayGame<'info> {
    /// CHECK: PDA vault that holds reward SOL
    #[account(
        mut,
        seeds = [b"vault", authority.key().as_ref()],
        bump
    )]
    pub vault: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub authority: Signer<'info>,

    #[account(seeds = [b"config"], bump)]
    pub config: Account<'info, GameConfig>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct GameConfig {
    pub transfer_amount: u64,
}
